import React from "react";

const CurrencyInput = ({ label, value, onChange, options }) => {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        {options.map((currency, index) => (
          <option key={currency + index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CurrencyInput;
