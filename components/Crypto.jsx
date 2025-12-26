// import { useState, useEffect } from 'react';

// function Crypto() {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [coinDetails, setCoinDetails] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   const API_KEY = '39063fc7-d726-443c-8d3e-55c7370eec6b';

//   useEffect(() => {
//     fetchCoins();
//   }, []);

//   const fetchCoins = async () => {
//     try {
//       const response = await fetch('https://api.livecoinwatch.com/coins/list', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//           'x-api-key': API_KEY
//         },
//         body: JSON.stringify({
//           currency: 'USD',
//           sort: 'rank',
//           order: 'ascending',
//           offset: 0,
//           limit: 50,
//           meta: true
//         })
//       });
//       const data = await response.json();
//       setCoins(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching coins:', err);
//       setLoading(false);
//     }
//   };

//   const fetchCoinDetails = async (code) => {
//     setDetailsLoading(true);
//     try {
//       const response = await fetch('https://api.livecoinwatch.com/coins/single', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//           'x-api-key': API_KEY
//         },
//         body: JSON.stringify({
//           currency: 'USD',
//           code: code,
//           meta: true
//         })
//       });
//       const data = await response.json();
//       setCoinDetails(data);
//       setDetailsLoading(false);
//     } catch (err) {
//       console.error('Error fetching coin details:', err);
//       setDetailsLoading(false);
//     }
//   };

//   const handleCoinClick = (coin) => {
//     setSelectedCoin(coin);
//     fetchCoinDetails(coin.code);
//   };

//   const closeModal = () => {
//     setSelectedCoin(null);
//     setCoinDetails(null);
//   };

//   const formatNumber = (num) => {
//     if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
//     if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
//     if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
//     return num?.toFixed(2);
//   };

//   const formatPrice = (price) => {
//     if (price >= 1) return price.toFixed(2);
//     return price.toFixed(6);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
//         <div className="text-white text-2xl">Loading cryptocurrencies...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-5xl font-bold text-center text-white mb-2">
//           Crypto Market
//         </h1>
//         <p className="text-center text-indigo-200 mb-8">
//           Click on any coin to view detailed information
//         </p>

//         {/* Coins Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {coins.map((coin) => (
//             <div
//               key={coin.code}
//               onClick={() => handleCoinClick(coin)}
//               className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-opacity-20 transition-all hover:scale-105 hover:shadow-2xl"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img src={coin.png64} alt={coin.name} className="w-12 h-12" />
//                 <div>
//                   <h3 className="text-xl font-bold text-white">{coin.name}</h3>
//                   <span className="text-gray-300">{coin.code}</span>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-300">Price:</span>
//                   <span className="text-white font-semibold">${formatPrice(coin.rate)}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-300">24h Change:</span>
//                   <span className={`font-semibold ${coin.delta.day >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                     {coin.delta.day > 0 ? '+' : ''}{coin.delta.day?.toFixed(2)}%
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-300">Market Cap:</span>
//                   <span className="text-white font-semibold">${formatNumber(coin.cap)}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-300">Rank:</span>
//                   <span className="text-indigo-300 font-semibold">#{coin.rank}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal for Coin Details */}
//         {selectedCoin && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
//             onClick={closeModal}
//           >
//             <div 
//               className="bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {detailsLoading ? (
//                 <div className="text-white text-center text-xl">Loading details...</div>
//               ) : coinDetails ? (
//                 <>
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-4">
//                       <img src={coinDetails.png64} alt={coinDetails.name} className="w-16 h-16" />
//                       <div>
//                         <h2 className="text-3xl font-bold text-white">{coinDetails.name}</h2>
//                         <span className="text-xl text-gray-300">{coinDetails.code}</span>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={closeModal}
//                       className="text-white hover:text-gray-300 text-3xl"
//                     >
//                       ×
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="bg-white bg-opacity-10 rounded-lg p-4">
//                       <div className="text-gray-300 text-sm">Current Price</div>
//                       <div className="text-2xl font-bold text-white">${formatPrice(coinDetails.rate)}</div>
//                     </div>

//                     <div className="bg-white bg-opacity-10 rounded-lg p-4">
//                       <div className="text-gray-300 text-sm">Market Cap</div>
//                       <div className="text-2xl font-bold text-white">${formatNumber(coinDetails.cap)}</div>
//                     </div>

//                     <div className="bg-white bg-opacity-10 rounded-lg p-4">
//                       <div className="text-gray-300 text-sm">24h Volume</div>
//                       <div className="text-2xl font-bold text-white">${formatNumber(coinDetails.volume)}</div>
//                     </div>

//                     <div className="bg-white bg-opacity-10 rounded-lg p-4">
//                       <div className="text-gray-300 text-sm">Circulating Supply</div>
//                       <div className="text-2xl font-bold text-white">{formatNumber(coinDetails.circulatingSupply)}</div>
//                     </div>
//                   </div>

//                   <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
//                     <h3 className="text-xl font-semibold text-white mb-3">Price Changes</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       <div>
//                         <div className="text-gray-300 text-sm">1 Hour</div>
//                         <div className={`text-lg font-bold ${coinDetails.delta.hour >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                           {coinDetails.delta.hour > 0 ? '+' : ''}{coinDetails.delta.hour?.toFixed(2)}%
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-gray-300 text-sm">24 Hours</div>
//                         <div className={`text-lg font-bold ${coinDetails.delta.day >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                           {coinDetails.delta.day > 0 ? '+' : ''}{coinDetails.delta.day?.toFixed(2)}%
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-gray-300 text-sm">1 Week</div>
//                         <div className={`text-lg font-bold ${coinDetails.delta.week >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                           {coinDetails.delta.week > 0 ? '+' : ''}{coinDetails.delta.week?.toFixed(2)}%
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-gray-300 text-sm">1 Month</div>
//                         <div className={`text-lg font-bold ${coinDetails.delta.month >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                           {coinDetails.delta.month > 0 ? '+' : ''}{coinDetails.delta.month?.toFixed(2)}%
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white bg-opacity-10 rounded-lg p-4">
//                     <h3 className="text-xl font-semibold text-white mb-3">Additional Info</h3>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-300">Rank:</span>
//                         <span className="text-white font-semibold">#{coinDetails.rank}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-300">All Time High:</span>
//                         <span className="text-white font-semibold">${formatPrice(coinDetails.allTimeHighUSD)}</span>
//                       </div>
//                       {coinDetails.totalSupply && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Total Supply:</span>
//                           <span className="text-white font-semibold">{formatNumber(coinDetails.totalSupply)}</span>
//                         </div>
//                       )}
//                       {coinDetails.maxSupply && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Max Supply:</span>
//                           <span className="text-white font-semibold">{formatNumber(coinDetails.maxSupply)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {coinDetails.links && (
//                     <div className="mt-6 flex flex-wrap gap-3">
//                       {coinDetails.links.website && (
//                         <a 
//                           href={coinDetails.links.website} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
//                         >
//                           Website
//                         </a>
//                       )}
//                       {coinDetails.links.whitepaper && (
//                         <a 
//                           href={coinDetails.links.whitepaper} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
//                         >
//                           Whitepaper
//                         </a>
//                       )}
//                       {coinDetails.links.twitter && (
//                         <a 
//                           href={coinDetails.links.twitter} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
//                         >
//                           Twitter
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </>
//               ) : null}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Crypto;
import { useState, useEffect } from 'react';

function Crypto() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = '39063fc7-d726-443c-8d3e-55c7370eec6b';

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await fetch('https://api.livecoinwatch.com/coins/list', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          currency: 'USD',
          sort: 'rank',
          order: 'ascending',
          offset: 0,
          limit: 50,
          meta: true
        })
      });
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching coins:', err);
      setLoading(false);
    }
  };

  const fetchCoinDetails = async (code) => {
    setDetailsLoading(true);
    try {
      const response = await fetch('https://api.livecoinwatch.com/coins/single', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          currency: 'USD',
          code: code,
          meta: true
        })
      });
      const data = await response.json();
      setCoinDetails(data);
      setDetailsLoading(false);
    } catch (err) {
      console.error('Error fetching coin details:', err);
      setDetailsLoading(false);
    }
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    fetchCoinDetails(coin.code);
  };

  const closeModal = () => {
    setSelectedCoin(null);
    setCoinDetails(null);
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num?.toFixed(2);
  };

  const formatPrice = (price) => {
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(6);
  };

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading cryptocurrencies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-2">
          Crypto Market
        </h1>
        <p className="text-center text-indigo-200 mb-8">
          Click on any coin to view detailed information
        </p>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or symbol (e.g., Bitcoin, BTC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <p className="text-indigo-200 text-sm mt-2">
              Found {filteredCoins.length} result{filteredCoins.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Coins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoins.map((coin) => (
            <div
              key={coin.code}
              onClick={() => handleCoinClick(coin)}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-opacity-20 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={coin.png64} alt={coin.name} className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold text-white">{coin.name}</h3>
                  <span className="text-gray-300">{coin.code}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-white font-semibold">${formatPrice(coin.rate)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">24h Change:</span>
                  <span className={`font-semibold ${coin.delta.day >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.delta.day > 0 ? '+' : ''}{coin.delta.day?.toFixed(2)}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Market Cap:</span>
                  <span className="text-white font-semibold">${formatNumber(coin.cap)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Rank:</span>
                  <span className="text-indigo-300 font-semibold">#{coin.rank}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCoins.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-white text-xl">No cryptocurrencies found matching "{searchQuery}"</p>
            <p className="text-indigo-200 mt-2">Try searching for a different name or symbol</p>
          </div>
        )}

        {/* Modal for Coin Details */}
        {selectedCoin && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {detailsLoading ? (
                <div className="text-white text-center text-xl">Loading details...</div>
              ) : coinDetails ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img src={coinDetails.png64} alt={coinDetails.name} className="w-16 h-16" />
                      <div>
                        <h2 className="text-3xl font-bold text-white">{coinDetails.name}</h2>
                        <span className="text-xl text-gray-300">{coinDetails.code}</span>
                      </div>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-white hover:text-gray-300 text-3xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-gray-300 text-sm">Current Price</div>
                      <div className="text-2xl font-bold text-white">${formatPrice(coinDetails.rate)}</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-gray-300 text-sm">Market Cap</div>
                      <div className="text-2xl font-bold text-white">${formatNumber(coinDetails.cap)}</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-gray-300 text-sm">24h Volume</div>
                      <div className="text-2xl font-bold text-white">${formatNumber(coinDetails.volume)}</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-gray-300 text-sm">Circulating Supply</div>
                      <div className="text-2xl font-bold text-white">{formatNumber(coinDetails.circulatingSupply)}</div>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Price Changes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <div className="text-gray-300 text-sm">1 Hour</div>
                        <div className={`text-lg font-bold ${coinDetails.delta.hour >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coinDetails.delta.hour > 0 ? '+' : ''}{coinDetails.delta.hour?.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">24 Hours</div>
                        <div className={`text-lg font-bold ${coinDetails.delta.day >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coinDetails.delta.day > 0 ? '+' : ''}{coinDetails.delta.day?.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">1 Week</div>
                        <div className={`text-lg font-bold ${coinDetails.delta.week >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coinDetails.delta.week > 0 ? '+' : ''}{coinDetails.delta.week?.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">1 Month</div>
                        <div className={`text-lg font-bold ${coinDetails.delta.month >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coinDetails.delta.month > 0 ? '+' : ''}{coinDetails.delta.month?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-white mb-3">Additional Info</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rank:</span>
                        <span className="text-white font-semibold">#{coinDetails.rank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">All Time High:</span>
                        <span className="text-white font-semibold">${formatPrice(coinDetails.allTimeHighUSD)}</span>
                      </div>
                      {coinDetails.totalSupply && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Supply:</span>
                          <span className="text-white font-semibold">{formatNumber(coinDetails.totalSupply)}</span>
                        </div>
                      )}
                      {coinDetails.maxSupply && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">Max Supply:</span>
                          <span className="text-white font-semibold">{formatNumber(coinDetails.maxSupply)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {coinDetails.links && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {coinDetails.links.website && (
                        <a 
                          href={coinDetails.links.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Website
                        </a>
                      )}
                      {coinDetails.links.whitepaper && (
                        <a 
                          href={coinDetails.links.whitepaper} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Whitepaper
                        </a>
                      )}
                      {coinDetails.links.twitter && (
                        <a 
                          href={coinDetails.links.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crypto;