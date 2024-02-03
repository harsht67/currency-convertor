import "./Convertor.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ConversionResult from "../Result/ConversionResult";

export default function Convertor() {
    const [currency, setCurrency] = useState([]);
    const [amount, setAmount] = useState("0");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [conversion, setConversion] = useState(0);
    const [isResult, setIsResult] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const options = {
                method: "GET",
                url: "https://currency-exchange.p.rapidapi.com/listquotes",
                headers: {
                    "X-RapidAPI-Key":
                        "6fc01cf93fmsh8ce7fac572c1e77p112105jsn04f92dc6d157",
                    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setCurrency(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetch();
    }, []);

    const changeAmount = (event) => {
        let input = event.target.value;

        if (!isNaN(input)) {
            if (amount.length === 1 && amount === "0") {
                // to avoid 035
                console.log("here");
                setAmount(input.substr(1));
            } else {
                setAmount(input);
            }
        }
    };

    const changeFrom = (event) => {
        setFrom(event.target.value);
        setIsResult(false);
    };

    const changeTo = (event) => {
        setTo(event.target.value);
        setIsResult(false);
    };

    const convert = async () => {
        console.log(amount);
        const options = {
            method: "GET",
            url: "https://currency-exchange.p.rapidapi.com/exchange",
            params: {
                to,
                from,
                q: amount,
            },
            headers: {
                "X-RapidAPI-Key": "6fc01cf93fmsh8ce7fac572c1e77p112105jsn04f92dc6d157",
                "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setConversion(response.data);
            setIsResult(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <article className="convertor">
            <section className="convertor__main">
                <label>
                    <span>Amount</span>
                    <input onChange={changeAmount} value={amount} />
                    {amount === "" && (
                        <span className="error">Please enter a valid amount</span>
                    )}
                </label>

                <label>
                    <span>From</span>
                    <select value={from} onChange={changeFrom}>
                        {/* <option>Select currency</option> */}
                        {currency.map((currency, index) => (
                            <option key={currency + index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>To</span>
                    <select value={to} onChange={changeTo}>
                        {/* <option>Select currency</option> */}
                        {currency.map((currency, index) => (
                            <option key={currency + index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </section>

            <section className="convertor__footer">
                {isResult ? (
                    <ConversionResult
                        from={from}
                        to={to}
                        amount={amount}
                        conversion={conversion}
                    />
                ) : (
                    <button className="convertor__btn" onClick={convert}>
                        Convert
                    </button>
                )}
            </section>
        </article>
    );
}
