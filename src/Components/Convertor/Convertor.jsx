import "./Convertor.css";

import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Convertor() {

    const [currency, setCurrency] = useState([]);
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('INR');
    const [result, setResult] = useState(0);

    useEffect(() => {

        const fetch = async () => {
            const options = {
                method: 'GET',
                url: 'https://currency-exchange.p.rapidapi.com/listquotes',
                headers: {
                    'X-RapidAPI-Key': '6fc01cf93fmsh8ce7fac572c1e77p112105jsn04f92dc6d157',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setCurrency(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetch();
    }, []);

    const changeAmount = (event) => {
        setAmount(event.target.value);
    }

    const changeFrom = (event) => {
        setFrom(event.target.value);
    }

    const changeTo = (event) => {
        setTo(event.target.value);
    }

    const convert = async () => {
        const options = {
            method: 'GET',
            url: 'https://currency-exchange.p.rapidapi.com/exchange',
            params: {
              to,
              from,
              q: amount
            },
            headers: {
              'X-RapidAPI-Key': '6fc01cf93fmsh8ce7fac572c1e77p112105jsn04f92dc6d157',
              'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setResult(response.data);
          } catch (error) {
              console.error(error);
          }
    }

    return (
        <article className='convertor'>

            <section className='convertor__main'>

                <label>
                    Amount
                    <input onChange={changeAmount} value={amount} />
                </label>

                <label>
                    From
                    <select value={from} onChange={changeFrom}>
                        {/* <option>Select currency</option> */}
                        {
                            currency.map((currency, index) => (
                                <option key={currency+index} value={currency}>
                                    {currency}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label>
                    To
                    <select value={to} onChange={changeTo}>
                        {/* <option>Select currency</option> */}
                        {
                            currency.map((currency, index) => (
                                <option key={currency+index} value={currency}>
                                    {currency}
                                </option>
                            ))
                        }
                    </select>
                </label>

            </section>

            <section className='convertor__footer'>

                <section className='convertor__conversion'>

                    <div className='convertor__result'>
                        <span>{from} {amount} =</span>
                        <span>{to} {result}</span>
                    </div>

                    <div>
                        1 USD = 82.2999 INR | 1 INR = 0.012 USD
                    </div>

                </section>

                <button className='convertor__btn' onClick={convert}>
                    Convert
                </button>

            </section>

        </article>
    )
}
