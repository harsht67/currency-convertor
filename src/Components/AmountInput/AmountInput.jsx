import React from 'react'

export default function AmountInput({label, value, onChange}) {

    return (
        <label>
            <span>{label}</span>
            <input onChange={onChange} value={value} />
            {!value && (
                <span className="error">Please enter a valid amount</span>
            )}
        </label>
    )
}