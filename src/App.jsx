import React from "react";
import { NavLink } from "react-router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Quantis Bull</h1>
        <p>
          Your one-stop destination to view live data on various markets and get
          real-time financial insights.
        </p>
      </header>

      <main>
        <section className="landing-text">
          <div className="text-content">
            <h2>Explore the Latest Financial Markets</h2>
            <p>
              Stay updated with the most relevant market information across
              stocks, cryptocurrency, and forex. Our platform gives you
              real-time insights, allowing you to make informed decisions
              quickly. Whether you're a novice investor or a seasoned trader, we
              have resources and tools designed for all levels.
            </p>
            <p>
              Want to dive deeper? Our chatbot feature is here to assist you in
              navigating the platform or answering any questions you may have
              about the markets. Explore and make the most of your financial
              journey today!
            </p>
          </div>
          <div className="image-container">
            <img
              src="/public/landing.svg"
              alt="Financial Markets"
              className="landing-image"
            />
          </div>
        </section>

        <div className="button-container">
          <NavLink to="/stock">
            <button className="market-button">Stock Market</button>
          </NavLink>
          <NavLink to="/crypto">
            <button className="market-button">Crypto</button>
          </NavLink>
          <NavLink to="/forex">
            <button className="market-button">Forex</button>
          </NavLink>
          <NavLink to="/chatbot">
            <button className="market-button">Chat Bot</button>
          </NavLink>
        </div>
      </main>
    </div>
  );
}

export default App;
