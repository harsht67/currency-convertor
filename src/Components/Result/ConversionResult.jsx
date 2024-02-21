import React from 'react'

import "./ConversionResult.css";

export default function ConversionResult({from, to, amount, conversion}) {
    return (
        <section className='conversionResult__conversion'>

            <div className='conversionResult__result'>
                <span>{from} {amount === '' ? '0' : (amount*1).toLocaleString()} =</span>
                <span>{to} {(amount * conversion).toLocaleString()}</span>
            </div>

            <div className='conversionResult__comparision'>
                <span>1 {from} = {(conversion).toFixed(4)} {to}</span>
                <span>|</span>
                <span>1 {to} = {(1/conversion).toFixed(4)} {from}</span>
            </div>

        </section>
    )
}
