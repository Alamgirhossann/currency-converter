import React from 'react';

const CurrencyBox = (props) => {
    const { currency, selectedCurrency, onChangeCurrency, amount, handleAmountChange } = props;
    
    return (
        <div>
            <input type="number" name="" id="" value={amount} onChange={handleAmountChange} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {
                    currency.map(cuntry =>
                        <option key={cuntry} value={cuntry}>{cuntry}</option>
                    )}

            </select>
        </div>
    );
};

export default CurrencyBox;