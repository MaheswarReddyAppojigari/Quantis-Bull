import { useState, useEffect } from 'react';

function Forex() {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState({});

  // Important forex currencies to highlight
  const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'CNY', 'INR'];

  useEffect(() => {
    // Fetch available currencies
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => setCurrencies(data))
      .catch(err => console.error('Error fetching currencies:', err));
  }, []);

  useEffect(() => {
    // Fetch current rates for display
    fetch('https://api.frankfurter.app/latest?from=USD')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(err => console.error('Error fetching rates:', err));
  }, []);

  const handleConvert = async () => {
    if (!amount || amount <= 0) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      setResult(data.rates[toCurrency]);
    } catch (err) {
      console.error('Error converting:', err);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Forex Currency Converter
        </h1>

        {/* Major Currencies Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Major Currency Rates (vs USD)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {majorCurrencies.filter(c => c !== 'USD').map(currency => (
              <div key={currency} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
                <div className="text-sm opacity-90">{currencies[currency]}</div>
                <div className="text-2xl font-bold">{currency}</div>
                <div className="text-lg mt-2">
                  {rates[currency] ? rates[currency].toFixed(4) : '...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Converter */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Convert Currency
          </h2>
          
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {Object.keys(currencies).map(code => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {Object.keys(currencies).map(code => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Converting...' : 'Convert'}
            </button>

            {/* Result */}
            {result !== null && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-gray-600 mb-2">Result</div>
                <div className="text-3xl font-bold text-gray-800">
                  {amount} {fromCurrency} = {result.toFixed(4)} {toCurrency}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  1 {fromCurrency} = {(result / amount).toFixed(6)} {toCurrency}
                </div>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Forex;