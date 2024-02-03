import React from 'react'

import "./Convertor.css";

export default function Convertor() {
  return (
    <article className='convertor'>

        <section className='convertor__main'>

            <label>
                Amount
                <input/>
            </label>
            
            <label>
                From
                <input/>
            </label>

            <label>
                To
                <input/>
            </label>

        </section>

        <section className='convertor__footer'>

            <section className='convertor__conversion'>
            
                <div className='convertor__result'>
                    <span>USD 3 =</span>
                    <span>INR 250.99</span>
                </div>

                <div>
                    1 USD = 82.2999 INR | 1 INR = 0.012 USD
                </div>
            
            </section>

            <button className='convertor__btn'>
                Convert
            </button>

        </section>

    </article>
  )
}
