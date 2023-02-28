import React, { useState } from 'react'

function NumericInput() {

    const [price, setPrice] = useState('')
    const [proPrice, setProPrice] = useState('0.00')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.validity.valid) {
            let { value } = e.target
            if (value.length > 2) {
                let newPrice = [value.slice(0, value.length - 2), '.', value.slice(value.length - 2)].join('')
                setProPrice(newPrice)
            } else if (value.length > 1) {
                setProPrice(p => '0.'.concat(e.target.value))
            } else {
                setProPrice(p => '0.0'.concat(e.target.value))
            }

            if (value.length == 0) {
                setProPrice('0.00')
            }

            setPrice(e.target.value)

        }
    }

    return (
        <>
            <input type="text" value={price} pattern="^\d{0,9}$" style={{ backgroundColor: 'lightblue' }} onChange={(e) => handleChange(e)} />
            <h1>{proPrice}</h1>
        </>
    )
}

export default NumericInput