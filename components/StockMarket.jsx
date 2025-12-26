// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   TrendingUp,
//   TrendingDown,
//   RefreshCw,
//   DollarSign,
// } from "lucide-react";

// const StockMarket = () => {
//   const [stocks, setStocks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [marketStatus, setMarketStatus] = useState("OPEN");

//   const popularStocks = [
//     {
//       symbol: "RELIANCE",
//       name: "Reliance Industries",
//       price: 2456.75,
//       change: 2.34,
//       changePercent: 0.95,
//       volume: "12.5M",
//       marketCap: "16.6T",
//     },
//     {
//       symbol: "TCS",
//       name: "Tata Consultancy Services",
//       price: 3678.9,
//       change: -15.2,
//       changePercent: -0.41,
//       volume: "8.2M",
//       marketCap: "13.4T",
//     },
//     {
//       symbol: "HDFCBANK",
//       name: "HDFC Bank",
//       price: 1645.3,
//       change: 8.45,
//       changePercent: 0.52,
//       volume: "15.3M",
//       marketCap: "12.1T",
//     },
//     {
//       symbol: "INFY",
//       name: "Infosys",
//       price: 1456.2,
//       change: 12.8,
//       changePercent: 0.89,
//       volume: "9.8M",
//       marketCap: "6.1T",
//     },
//     {
//       symbol: "ICICIBANK",
//       name: "ICICI Bank",
//       price: 1098.65,
//       change: -5.35,
//       changePercent: -0.48,
//       volume: "18.7M",
//       marketCap: "7.7T",
//     },
//     {
//       symbol: "HINDUNILVR",
//       name: "Hindustan Unilever",
//       price: 2234.5,
//       change: 18.75,
//       changePercent: 0.85,
//       volume: "5.4M",
//       marketCap: "5.3T",
//     },
//     {
//       symbol: "BHARTIARTL",
//       name: "Bharti Airtel",
//       price: 1523.4,
//       change: 23.6,
//       changePercent: 1.57,
//       volume: "11.2M",
//       marketCap: "8.9T",
//     },
//     {
//       symbol: "ITC",
//       name: "ITC Limited",
//       price: 456.8,
//       change: -2.15,
//       changePercent: -0.47,
//       volume: "22.1M",
//       marketCap: "5.7T",
//     },
//     {
//       symbol: "SBIN",
//       name: "State Bank of India",
//       price: 623.45,
//       change: 7.9,
//       changePercent: 1.28,
//       volume: "28.5M",
//       marketCap: "5.6T",
//     },
//     {
//       symbol: "LT",
//       name: "Larsen & Toubro",
//       price: 3567.2,
//       change: -12.35,
//       changePercent: -0.35,
//       volume: "6.9M",
//       marketCap: "5.0T",
//     },
//   ];

//   const indices = [
//     { name: "NIFTY 50", value: 21845.75, change: 125.3, changePercent: 0.58 },
//     { name: "SENSEX", value: 72456.89, change: -89.45, changePercent: -0.12 },
//     {
//       name: "NIFTY BANK",
//       value: 45678.34,
//       change: 234.67,
//       changePercent: 0.52,
//     },
//   ];

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setStocks(popularStocks);
//       setLoading(false);
//     }, 1000);

//     const interval = setInterval(() => {
//       setStocks((prevStocks) =>
//         prevStocks.map((stock) => ({
//           ...stock,
//           price: stock.price + (Math.random() - 0.5) * 10,
//           change: stock.change + (Math.random() - 0.5) * 2,
//           changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5,
//         }))
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const filteredStocks = stocks.filter(
//     (stock) =>
//       stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stock.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const refreshData = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setStocks([...popularStocks]);
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">
//               Indian Stock Market
//             </h1>
//             <p className="text-gray-600">Live NSE/BSE Market Data</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div
//               className={`px-4 py-2 rounded-full font-semibold ${
//                 marketStatus === "OPEN"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               Market {marketStatus}
//             </div>
//             <button
//               onClick={refreshData}
//               className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:rotate-180 duration-500"
//             >
//               <RefreshCw className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           {indices.map((index, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   {index.name}
//                 </h3>
//                 {index.change >= 0 ? (
//                   <TrendingUp className="w-5 h-5 text-green-500" />
//                 ) : (
//                   <TrendingDown className="w-5 h-5 text-red-500" />
//                 )}
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2">
//                 {index.value.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                 })}
//               </div>
//               <div
//                 className={`text-sm font-semibold ${
//                   index.change >= 0 ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {index.change >= 0 ? "+" : ""}
//                 {index.change.toFixed(2)} ({index.changePercent >= 0 ? "+" : ""}
//                 {index.changePercent.toFixed(2)}%)
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="relative mb-6">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search stocks by symbol or name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-md"
//           />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {filteredStocks.map((stock, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedStock(stock)}
//                 className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
//                       {stock.symbol.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800">
//                         {stock.symbol}
//                       </h3>
//                       <p className="text-sm text-gray-500">{stock.name}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-8">
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-gray-900">
//                         ₹{stock.price.toFixed(2)}
//                       </div>
//                       <div
//                         className={`text-sm font-semibold ${
//                           stock.change >= 0 ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {stock.change >= 0 ? "+" : ""}
//                         {stock.change.toFixed(2)} (
//                         {stock.changePercent >= 0 ? "+" : ""}
//                         {stock.changePercent.toFixed(2)}%)
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <div className="text-xs text-gray-500">
//                         Volume: {stock.volume}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         MCap: ₹{stock.marketCap}
//                       </div>
//                     </div>

//                     {stock.change >= 0 ? (
//                       <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                         <TrendingUp className="w-8 h-8 text-green-600" />
//                       </div>
//                     ) : (
//                       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//                         <TrendingDown className="w-8 h-8 text-red-600" />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {filteredStocks.length === 0 && !loading && (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">📊</div>
//             <h3 className="text-2xl font-bold text-gray-700 mb-2">
//               No stocks found
//             </h3>
//             <p className="text-gray-500">
//               Try searching for a different stock symbol or name
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Stock Detail Modal */}
//       {selectedStock && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           onClick={() => setSelectedStock(null)}
//         >
//           <div
//             className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">
//                   {selectedStock.symbol}
//                 </h2>
//                 <p className="text-gray-600">{selectedStock.name}</p>
//               </div>
//               <button
//                 onClick={() => setSelectedStock(null)}
//                 className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <div className="bg-blue-50 rounded-xl p-4">
//                 <div className="text-sm text-gray-600 mb-1">Current Price</div>
//                 <div className="text-3xl font-bold text-gray-900">
//                   ₹{selectedStock.price.toFixed(2)}
//                 </div>
//               </div>
//               <div
//                 className={`${
//                   selectedStock.change >= 0 ? "bg-green-50" : "bg-red-50"
//                 } rounded-xl p-4`}
//               >
//                 <div className="text-sm text-gray-600 mb-1">Change</div>
//                 <div
//                   className={`text-3xl font-bold ${
//                     selectedStock.change >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {selectedStock.change >= 0 ? "+" : ""}
//                   {selectedStock.change.toFixed(2)} (
//                   {selectedStock.changePercent >= 0 ? "+" : ""}
//                   {selectedStock.changePercent.toFixed(2)}%)
//                 </div>
//               </div>
//               <div className="bg-purple-50 rounded-xl p-4">
//                 <div className="text-sm text-gray-600 mb-1">Volume</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {selectedStock.volume}
//                 </div>
//               </div>
//               <div className="bg-indigo-50 rounded-xl p-4">
//                 <div className="text-sm text-gray-600 mb-1">Market Cap</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   ₹{selectedStock.marketCap}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
//                 View Detailed Chart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockMarket;
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
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.75, change: 2.34, changePercent: 0.95, volume: "12.5M", marketCap: "16.6T" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3678.9, change: -15.2, changePercent: -0.41, volume: "8.2M", marketCap: "13.4T" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1645.3, change: 8.45, changePercent: 0.52, volume: "15.3M", marketCap: "12.1T" },
    { symbol: "INFY", name: "Infosys", price: 1456.2, change: 12.8, changePercent: 0.89, volume: "9.8M", marketCap: "6.1T" },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1098.65, change: -5.35, changePercent: -0.48, volume: "18.7M", marketCap: "7.7T" },
  ];

  const indices = [
    { name: "NIFTY 50", value: 21845.75, change: 125.3, changePercent: 0.58 },
    { name: "SENSEX", value: 72456.89, change: -89.45, changePercent: -0.12 },
    { name: "NIFTY BANK", value: 45678.34, change: 234.67, changePercent: 0.52 },
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
      const quoteResponse = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`);
      const quoteData = await quoteResponse.json();
      
      const statsResponse = await fetch(`https://api.twelvedata.com/statistics?symbol=${symbol}&apikey=${API_KEY}`);
      const statsData = await statsResponse.json();
      
      const logoResponse = await fetch(`https://api.twelvedata.com/logo?symbol=${symbol}&apikey=${API_KEY}`);
      const logoData = await logoResponse.json();
      
      if (quoteData.status === "ok" || quoteData.symbol) {
        setFundamentals({
          quote: quoteData,
          statistics: statsData.statistics || statsData,
          logo: logoData.url || null
        });
      } else {
        alert("Stock not found. Please try another symbol.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching data. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchStockData(searchTerm.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Indian Stock Market</h1>
            <p className="text-gray-600">Live NSE/BSE Market Data</p>
          </div>
          <div className={`px-4 py-2 rounded-full font-semibold ${marketStatus === "OPEN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            Market {marketStatus}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {indices.map((index, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">{index.name}</h3>
                {index.change >= 0 ? <TrendingUp className="w-5 h-5 text-green-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{index.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
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
              placeholder="Search stocks (e.g., AAPL, TSLA, RELIANCE.BSE)..."
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

        {fundamentals && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {fundamentals.logo && (
                  <img src={fundamentals.logo} alt={fundamentals.quote.symbol} className="w-16 h-16 rounded-lg" onError={(e) => e.target.style.display = 'none'} />
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{fundamentals.quote.symbol}</h2>
                  <p className="text-gray-600">{fundamentals.quote.name}</p>
                  <p className="text-sm text-gray-500">{fundamentals.quote.exchange} • {fundamentals.quote.currency}</p>
                </div>
              </div>
              <button onClick={() => setFundamentals(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Current Price</div>
                <div className="text-2xl font-bold text-gray-900">{fundamentals.quote.currency} {parseFloat(fundamentals.quote.close).toFixed(2)}</div>
              </div>
              <div className={`${fundamentals.quote.change >= 0 ? "bg-green-50" : "bg-red-50"} rounded-xl p-4`}>
                <div className="text-sm text-gray-600 mb-1">Change</div>
                <div className={`text-2xl font-bold ${fundamentals.quote.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {fundamentals.quote.change >= 0 ? "+" : ""}{parseFloat(fundamentals.quote.change).toFixed(2)} ({fundamentals.quote.percent_change}%)
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Volume</div>
                <div className="text-xl font-bold text-gray-900">{parseInt(fundamentals.quote.volume).toLocaleString()}</div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Prev Close</div>
                <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.quote.previous_close).toFixed(2)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">Day Range</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{fundamentals.quote.low}</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{width: '60%'}}></div></div>
                  <span className="font-semibold">{fundamentals.quote.high}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">52 Week Range</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{fundamentals.quote.fifty_two_week?.low || "N/A"}</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width: '50%'}}></div></div>
                  <span className="font-semibold">{fundamentals.quote.fifty_two_week?.high || "N/A"}</span>
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
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.valuations_metrics.pe_ratio).toFixed(2)}</div>
                    </div>
                  )}
                  {fundamentals.statistics.valuations_metrics?.pb_ratio && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">P/B Ratio</div>
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.valuations_metrics.pb_ratio).toFixed(2)}</div>
                    </div>
                  )}
                  {fundamentals.statistics.valuations_metrics?.market_capitalization && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Market Cap</div>
                      <div className="text-xl font-bold text-gray-900">{(fundamentals.statistics.valuations_metrics.market_capitalization / 1e9).toFixed(2)}B</div>
                    </div>
                  )}
                  {fundamentals.statistics.dividends?.dividend_yield && (
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.dividends.dividend_yield).toFixed(2)}%</div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.profit_margin && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Profit Margin</div>
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.financials.profit_margin).toFixed(2)}%</div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.return_on_equity && (
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">ROE</div>
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.financials.return_on_equity).toFixed(2)}%</div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.eps && (
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">EPS</div>
                      <div className="text-xl font-bold text-gray-900">{parseFloat(fundamentals.statistics.financials.eps).toFixed(2)}</div>
                    </div>
                  )}
                  {fundamentals.statistics.financials?.revenue && (
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Revenue</div>
                      <div className="text-xl font-bold text-gray-900">{(fundamentals.statistics.financials.revenue / 1e9).toFixed(2)}B</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {stocks.map((stock, index) => (
              <div key={index} onClick={() => setSelectedStock(stock)} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">{stock.symbol.charAt(0)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{stock.symbol}</h3>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
                      <div className={`text-sm font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    {stock.change >= 0 ? (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><TrendingUp className="w-8 h-8 text-green-600" /></div>
                    ) : (
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"><TrendingDown className="w-8 h-8 text-red-600" /></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedStock(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedStock.symbol}</h2>
                <p className="text-gray-600">{selectedStock.name}</p>
              </div>
              <button onClick={() => setSelectedStock(null)} className="text-gray-400 hover:text-gray-600 text-3xl font-bold">×</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Current Price</div>
                <div className="text-3xl font-bold text-gray-900">₹{selectedStock.price.toFixed(2)}</div>
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
                <div className="text-2xl font-bold text-gray-900">₹{selectedStock.marketCap}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMarket;