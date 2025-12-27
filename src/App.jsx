// import React from "react";
// import { NavLink } from "react-router";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Welcome to the Quantis Bull</h1>
//         <p>
//           Your one-stop destination to view live data on various markets and get
//           real-time financial insights.
//         </p>
//       </header>

//       <main>
//         <section className="landing-text">
//           <div className="text-content">
//             <h2>Explore the Latest Financial Markets</h2>
//             <p>
//               Stay updated with the most relevant market information across
//               stocks, cryptocurrency, and forex. Our platform gives you
//               real-time insights, allowing you to make informed decisions
//               quickly. Whether you're a novice investor or a seasoned trader, we
//               have resources and tools designed for all levels.
//             </p>
//             <p>
//               Want to dive deeper? Our chatbot feature is here to assist you in
//               navigating the platform or answering any questions you may have
//               about the markets. Explore and make the most of your financial
//               journey today!
//             </p>
//           </div>
//           <div className="image-container">
//             <img
//               src="/landing.svg"
//               alt="Financial Markets"
//               className="landing-image"
//             />
//           </div>
//         </section>

//         <div className="button-container">
//           <NavLink to="/stock">
//             <button className="market-button">Stock Market</button>
//           </NavLink>
//           <NavLink to="/crypto">
//             <button className="market-button">Crypto</button>
//           </NavLink>
//           <NavLink to="/forex">
//             <button className="market-button">Forex</button>
//           </NavLink>
//           <NavLink to="/chatbot">
//             <button className="market-button">Chat Bot</button>
//           </NavLink>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
import {NavLink} from "react-router"
import React from "react";
import {
  TrendingUp,
  Bitcoin,
  DollarSign,
  MessageSquare,
  BarChart3,
  Sparkles,
} from "lucide-react";

function App() {
  const markets = [
    {
      title: "Stock Market",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Track live stock prices and market trends",
      gradient: "from-blue-500 to-blue-700",
      path: "/stock",
    },
    {
      title: "Crypto",
      icon: <Bitcoin className="w-8 h-8" />,
      description: "Monitor cryptocurrency markets in real-time",
      gradient: "from-purple-500 to-purple-700",
      path: "/crypto",
    },
    {
      title: "Forex",
      icon: <DollarSign className="w-8 h-8" />,
      description: "Access foreign exchange rates instantly",
      gradient: "from-green-500 to-green-700",
      path: "/forex",
    },
    {
      title: "Chat Bot",
      icon: <MessageSquare className="w-8 h-8" />,
      description: "Get AI-powered financial assistance",
      gradient: "from-orange-500 to-orange-700",
      path: "/chatbot",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
     
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Real-time Market Intelligence
            </div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              Explore the Latest Financial Markets
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stay updated with the most relevant market information across
              stocks, cryptocurrency, and forex. Our platform gives you
              real-time insights, allowing you to make informed decisions
              quickly.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you're a novice investor or a seasoned trader, we have
              resources and tools designed for all levels. Our AI-powered
              chatbot is ready to assist you in navigating the platform and
              answering your market questions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <img
                src="/landing.svg"
                alt="Financial Markets"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Market Cards */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Choose Your Market
            </h3>
            <p className="text-lg text-slate-600">
              Select a market to start exploring live data and insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((market, index) => (
              <NavLink
                key={index}
                to={market.path}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${market.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative p-8 space-y-4">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${market.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {market.icon}
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                    {market.title}
                  </h4>

                  <p className="text-slate-600 group-hover:text-white/90 transition-colors duration-300">
                    {market.description}
                  </p>

                  <div className="flex items-center text-blue-600 group-hover:text-white font-semibold transition-colors duration-300">
                    Explore
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20 bg-white rounded-3xl shadow-xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="inline-flex p-4 bg-blue-100 rounded-full">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Real-Time Data
              </h4>
              <p className="text-slate-600">
                Live updates on all major markets and assets
              </p>
            </div>

            <div className="space-y-3">
              <div className="inline-flex p-4 bg-purple-100 rounded-full">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Advanced Analytics
              </h4>
              <p className="text-slate-600">
                Comprehensive tools for market analysis
              </p>
            </div>

            <div className="space-y-3">
              <div className="inline-flex p-4 bg-green-100 rounded-full">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">AI Assistant</h4>
              <p className="text-slate-600">
                Get instant answers to your market questions
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
