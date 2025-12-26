
import React, { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [marketStatus, setMarketStatus] = useState("OPEN");
  const [searchLoading, setSearchLoading] = useState(false);
  const [fundamentals, setFundamentals] = useState(null);
  
  const API_KEY = "f30ceca830fe4068bd16eefe4beb78e4";

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 195.71, change: 2.45, changePercent: 1.27, volume: "52.3M", marketCap: "3.0T" },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 378.91, change: -3.21, changePercent: -0.84, volume: "28.5M", marketCap: "2.8T" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 140.93, change: 1.87, changePercent: 1.35, volume: "31.2M", marketCap: "1.8T" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: 4.32, changePercent: 2.48, volume: "45.8M", marketCap: "1.8T" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.42, change: -5.67, changePercent: -2.23, volume: "89.4M", marketCap: "789B" },
    { symbol: "META", name: "Meta Platforms Inc.", price: 512.33, change: 8.91, changePercent: 1.77, volume: "19.7M", marketCap: "1.3T" },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 495.22, change: 12.45, changePercent: 2.58, volume: "42.1M", marketCap: "1.2T" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.76, change: -1.23, changePercent: -0.62, volume: "12.3M", marketCap: "573B" },
  ];

  const indices = [
    { name: "S&P 500", symbol: "SPX", value: 4783.45, change: 28.73, changePercent: 0.60 },
    { name: "DOW JONES", symbol: "DJI", value: 37305.16, change: -45.20, changePercent: -0.12 },
    { name: "NASDAQ", symbol: "IXIC", value: 15188.39, change: 156.37, changePercent: 1.04 },
  ];

  useEffect(() => {
    setTimeout(() => {
      setStocks(popularStocks);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchStockData = async (symbol) => {
    setSearchLoading(true);
    setFundamentals(null);
    
    try {
      // Fetch quote data
      const quoteResponse = await fetch(
        `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
      );
      const quoteData = await quoteResponse.json();
      
      if (quoteData.code === 400 || quoteData.status === "error") {
        alert("Stock not found. Please try another symbol (e.g., AAPL, TSLA, MSFT)");
        setSearchLoading(false);
        return;
      }

      // Fetch statistics data
      const statsResponse = await fetch(
        `https://api.twelvedata.com/statistics?symbol=${symbol}&apikey=${API_KEY}`
      );
      const statsData = await statsResponse.json();
      
      // Fetch logo
      const logoResponse = await fetch(
        `https://api.twelvedata.com/logo?symbol=${symbol}&apikey=${API_KEY}`
      );
      const logoData = await logoResponse.json();
      
      setFundamentals({
        quote: quoteData,
        statistics: statsData.statistics || {},
        logo: logoData.url || null
      });
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching data. Please check your API key or try again later.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchStockData(searchTerm.toUpperCase().trim());
    }
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setStocks([...popularStocks]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">US Stock Market</h1>
            <p className="text-gray-600">Live NYSE/NASDAQ Market Data</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full font-semibold ${marketStatus === "OPEN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              Market {marketStatus}
            </div>
            <button
              onClick={refreshData}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:rotate-180 duration-500"
            >
              <RefreshCw className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {indices.map((index, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">{index.name}</h3>
                {index.change >= 0 ? <TrendingUp className="w-5 h-5 text-green-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {index.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm font-semibold ${index.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {index.change >= 0 ? "+" : ""}{index.change.toFixed(2)} ({index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stocks (e.g., AAPL, TSLA, MSFT, GOOGL)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-md"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {fundamentals && fundamentals.quote && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {fundamentals.logo && (
                  <img 
                    src={fundamentals.logo} 
                    alt={fundamentals.quote.symbol} 
                    className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2" 
                    onError={(e) => e.target.style.display = 'none'} 
                  />
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{fundamentals.quote.symbol}</h2>
                  <p className="text-gray-600">{fundamentals.quote.name}</p>
                  <p className="text-sm text-gray-500">{fundamentals.quote.exchange} • {fundamentals.quote.currency}</p>
                </div>
              </div>
              <button 
                onClick={() => setFundamentals(null)} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Current Price</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${parseFloat(fundamentals.quote.close).toFixed(2)}
                </div>
              </div>
              <div className={`${parseFloat(fundamentals.quote.change) >= 0 ? "bg-green-50" : "bg-red-50"} rounded-xl p-4`}>
                <div className="text-sm text-gray-600 mb-1">Change</div>
                <div className={`text-2xl font-bold ${parseFloat(fundamentals.quote.change) >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {parseFloat(fundamentals.quote.change) >= 0 ? "+" : ""}
                  {parseFloat(fundamentals.quote.change).toFixed(2)} ({fundamentals.quote.percent_change}%)
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Volume</div>
                <div className="text-xl font-bold text-gray-900">
                  {parseInt(fundamentals.quote.volume).toLocaleString()}
                </div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Prev Close</div>
                <div className="text-xl font-bold text-gray-900">
                  ${parseFloat(fundamentals.quote.previous_close).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">Day Range</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${fundamentals.quote.low}</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="font-semibold">${fundamentals.quote.high}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">52 Week Range</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    ${fundamentals.quote.fifty_two_week?.low || "N/A"}
                  </span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <span className="font-semibold">
                    ${fundamentals.quote.fifty_two_week?.high || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {fundamentals.statistics && Object.keys(fundamentals.statistics).length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Fundamental Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {fundamentals.statistics.valuations_metrics?.pe_ratio && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">P/E Ratio</div>
                      <div className="text-xl font-bold text-gray-900">
                        {parseFloat(fundamentals.statistics.valuations_metrics.pe_ratio).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.valuations_metrics?.pb_ratio && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">P/B Ratio</div>
                      <div className="text-xl font-bold text-gray-900">
                        {parseFloat(fundamentals.statistics.valuations_metrics.pb_ratio).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.valuations_metrics?.market_capitalization && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Market Cap</div>
                      <div className="text-xl font-bold text-gray-900">
                        ${(fundamentals.statistics.valuations_metrics.market_capitalization / 1e9).toFixed(2)}B
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.dividends?.dividend_yield && (
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
                      <div className="text-xl font-bold text-gray-900">
                        {parseFloat(fundamentals.statistics.dividends.dividend_yield).toFixed(2)}%
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.profit_margin && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Profit Margin</div>
                      <div className="text-xl font-bold text-gray-900">
                        {parseFloat(fundamentals.statistics.financials.profit_margin).toFixed(2)}%
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.return_on_equity && (
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">ROE</div>
                      <div className="text-xl font-bold text-gray-900">
                        {parseFloat(fundamentals.statistics.financials.return_on_equity).toFixed(2)}%
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.eps && (
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">EPS</div>
                      <div className="text-xl font-bold text-gray-900">
                        ${parseFloat(fundamentals.statistics.financials.eps).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.revenue && (
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Revenue</div>
                      <div className="text-xl font-bold text-gray-900">
                        ${(fundamentals.statistics.financials.revenue / 1e9).toFixed(2)}B
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Stocks</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {stocks.map((stock, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedStock(stock)} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {stock.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{stock.symbol}</h3>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</div>
                      <div className={`text-sm font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
                      <div className="text-xs text-gray-500">MCap: ${stock.marketCap}</div>
                    </div>
                    {stock.change >= 0 ? (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-8 h-8 text-red-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedStock && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
          onClick={() => setSelectedStock(null)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedStock.symbol}</h2>
                <p className="text-gray-600">{selectedStock.name}</p>
              </div>
              <button 
                onClick={() => setSelectedStock(null)} 
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Current Price</div>
                <div className="text-3xl font-bold text-gray-900">${selectedStock.price.toFixed(2)}</div>
              </div>
              <div className={`${selectedStock.change >= 0 ? "bg-green-50" : "bg-red-50"} rounded-xl p-4`}>
                <div className="text-sm text-gray-600 mb-1">Change</div>
                <div className={`text-3xl font-bold ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? "+" : ""}{selectedStock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Volume</div>
                <div className="text-2xl font-bold text-gray-900">{selectedStock.volume}</div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Market Cap</div>
                <div className="text-2xl font-bold text-gray-900">${selectedStock.marketCap}</div>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => {
                  setSelectedStock(null);
                  setSearchTerm(selectedStock.symbol);
                  fetchStockData(selectedStock.symbol);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                View Live Data & Fundamentals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMarket;