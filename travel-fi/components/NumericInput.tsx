import React, { useState } from 'react'
import { Experience, Prisma } from '@prisma/client'
import transformPrice from '@/client/helperFn/tranformPrice'
import cleanPrice from '@/client/helperFn/cleanPrice'

function NumericInput({ priceProp, currencyProp, callback }: { priceProp: Prisma.Decimal, currencyProp: string, callback: <T extends keyof Experience>(key: T, value: Experience[T]) => void }) {


    const cleanedPrice = cleanPrice(priceProp)
    const [testPrice, setTestPrice] = useState(cleanedPrice)
    const [price, setPrice] = useState(transformPrice(testPrice))

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

    return (
        <>
            <input type="text"
                readOnly
                value={currencyProp.concat(' '.concat(price))}
                onKeyDown={(e) => onFakeChange(e)}
            />
        </>
    )
}

export default NumericInput