import React from 'react'

export default function ConversionResult({from, to, amount, conversion}) {
    return (
        <section className='convertor__conversion'>

            <div className='convertor__result'>
                <span>{from} {amount === '' ? '0' : (amount*1).toLocaleString()} =</span>
                <span>{to} {(amount * conversion).toLocaleString()}</span>
            </div>

            <div className='convertor__comparision'>
                <span>1 USD = {conversion} INR</span>
                <span>|</span>
                <span>1 INR = {(1/conversion).toFixed(4)} USD</span>
            </div>

        </section>
    )
}
