import React, { useRef, useState } from 'react'
import { Experience, Prisma } from '@prisma/client'
import { transformPrice, formatPrice, formatPrice2 } from '@/client/helperFn/tranformPrice'
import cleanPrice from '@/client/helperFn/cleanPrice'

function NumericInput({ priceProp, currencyProp, callback }: { priceProp: Prisma.Decimal, currencyProp: string, callback: <T extends keyof Experience>(key: T, value: Experience[T]) => void }) {


    const cleanedPrice = cleanPrice(priceProp)
    const [testPrice, setTestPrice] = useState(cleanedPrice)
    const [price, setPrice] = useState(transformPrice(testPrice))

    const [oldValue, setOldValue] = useState("")
    const inputRef = useRef<number | null>(null)

    const regex = new RegExp('^(([0]{1})|([0]{1}[.]{1}(([0]{0,1})|([0-9]{0,2})))|(([1-9]{1}[0-9]{0,6})([.]{1}[0-9]{0,2})?))$')

    function onFakeChange(e: React.KeyboardEvent<HTMLInputElement>) {
        let newTestPrice = ''
        let newPrice = ''

        let allowedKeys = Array.from(Array(10).keys()).map(e => e.toString())
        allowedKeys.push('Backspace')

        if (allowedKeys.includes(e.key)) {
            if (e.key == 'Backspace') {
                if (testPrice.length > 0) {
                    newTestPrice = testPrice.slice(0, testPrice.length - 1)
                    newPrice = transformPrice(newTestPrice)
                    if (regex.test(newPrice)) {
                        setTestPrice(newTestPrice)
                        setPrice(newPrice)
                        callback("price", new Prisma.Decimal(newPrice))
                    }
                }
            } else {
                if (testPrice.length > 8) {
                    return
                }
                if (testPrice.length === 0 && e.key === '0') {
                    return
                }
                newTestPrice = testPrice.concat(e.key)
                newPrice = transformPrice(newTestPrice)
                if (regex.test(newPrice)) {
                    setTestPrice(newTestPrice)
                    setPrice(newPrice)
                    callback("price", new Prisma.Decimal(newPrice))
                }
            }
        }
    }

    function test(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.selectionStart || e.target.selectionStart < 5) {
            e.target.setSelectionRange(4, 4)
        }
        inputRef.current = e.target.selectionStart
        let value = e.target.value.replaceAll('.', '')
        value = value.substring(4, value.length)
        value = value.replaceAll(',', '')
        value = value.replaceAll('a', '')
        value = value.replaceAll('A', '')
        value = value.replace(/^0+/, '')
        const newPrice = formatPrice2(value)
        if (regex.test(newPrice.replaceAll(",", ""))) {
            let isDeleteKey
            if (Number(newPrice.replaceAll(",", "")) - Number(oldValue.substring(4, oldValue.length).replaceAll(",", "")) > 0) {
                isDeleteKey = false
            } else {
                isDeleteKey = true
            }
            setPrice(newPrice)
            setOldValue(currencyProp.concat(' '.concat(newPrice)))
            let diff = currencyProp.concat(' '.concat(newPrice)).length - oldValue.length
            if (isDeleteKey) {
                if (diff == -2) {
                    inputRef.current! -= 1
                }
                if (diff == 0) {
                    inputRef.current! += 1
                }
            } else {
                if (diff == 2) {
                    inputRef.current! += 1
                }
                if (diff == 0) {
                    inputRef.current! -= 1
                }
            }
            callback("price", new Prisma.Decimal(newPrice.replaceAll(",", "")))

            window.requestAnimationFrame(() => {
                e.target.setSelectionRange(Number(inputRef.current), Number(inputRef.current))
            })
        }
    }

    function handleKeys(e: React.KeyboardEvent<HTMLInputElement>) {
        let allowedKeys = Array.from(Array(10).keys()).map(e => e.toString())
        allowedKeys.push('Backspace')
        allowedKeys.push('Delete')
        allowedKeys.push('ArrowLeft')
        allowedKeys.push('ArrowRight')
        allowedKeys.push('Control')
        allowedKeys.push('a')
        allowedKeys.push('A')
        if (!allowedKeys.includes(e.key)) {
            e.preventDefault()
        }
    }

    return (
        <>
            <input type="text"
                // readOnly
                // value={currencyProp.concat(' '.concat(formatPrice(price.replaceAll('.', ''))))}
                // onKeyDown={(e) => onFakeChange(e)}
                value={currencyProp.concat(' '.concat(price))}
                onChange={(e) => test(e)}
                onKeyDown={(e) => handleKeys(e)}
                onFocus={(e) => { setOldValue(e.target.value) }}
            />
        </>
    )
}

export default NumericInput