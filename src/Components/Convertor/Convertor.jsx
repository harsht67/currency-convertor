import "./Convertor.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ConversionResult from "../Result/ConversionResult";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import AmountInput from "../AmountInput/AmountInput";

const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const RAPID_API_URL = process.env.REACT_APP_RAPID_API_URL;

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
                    "X-RapidAPI-Key": RAPID_API_KEY,
                    "X-RapidAPI-Host": RAPID_API_URL,
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
                setAmount(input.substr(1));
            } else {
                setAmount(input);
            }
        }
    };

    const changeFrom = ({target}) => {
        setFrom(target.value);
        setIsResult(false);
    };

    const changeTo = ({target}) => {
        setTo(target.value);
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
                "X-RapidAPI-Key": RAPID_API_KEY,
                "X-RapidAPI-Host": RAPID_API_URL,
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
                
                <AmountInput label="Amount" value={amount} onChange={changeAmount} />

                <CurrencyInput label="From" value={from} onChange={changeFrom} options={currency} />

                <CurrencyInput label="To" value={to} onChange={changeTo} options={currency} />

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
