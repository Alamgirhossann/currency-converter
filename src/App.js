import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import CurrencyBox from './CurrencyBox';

function App() {
  const [currency, setCurrency] = useState([]);
  const [yourCurrency, setYourCurrency] = useState();
  const [convertCurrency, setConvertCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let convertAmount, yourAmount;
  if (amountInFromCurrency) {
    yourAmount = amount
    convertAmount = amount * exchangeRate
  } else {
    convertAmount = amount
    yourAmount = amount / exchangeRate
  }

  const handleFromAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  const handleToAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/62ad13333f330e3ae6ce7ce0/latest/INR')
      .then(res => res.json())
      .then(data => {
        const selectCurrency = Object.keys(data.conversion_rates)[0]
        setCurrency([...Object.keys(data.conversion_rates)])
        setYourCurrency(data.base_code)
        setConvertCurrency(selectCurrency)
        setExchangeRate(data.conversion_rates[selectCurrency])
      })
  }, [])

  useEffect(() => {
    if (yourCurrency != null && convertCurrency != null) {
      fetch(`https://v6.exchangerate-api.com/v6/62ad13333f330e3ae6ce7ce0/latest/INR?base=${yourCurrency}&symble=${convertCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rates[convertCurrency]))
    }
  }, [yourCurrency, convertCurrency])


  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyBox
        onChangeCurrency={e => setYourCurrency(e.target.value)}
        handleAmountChange={handleFromAmountChange}
        amount={yourAmount}
        selectedCurrency={yourCurrency}
        currency={currency}
      ></CurrencyBox>
      <CurrencyBox
        handleAmountChange={handleToAmountChange}
        amount={convertAmount}
        onChangeCurrency={e => setConvertCurrency(e.target.value)}
        selectedCurrency={convertCurrency}
        currency={currency}
      ></CurrencyBox>
    </div>
  );
}

export default App;
