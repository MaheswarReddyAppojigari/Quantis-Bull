import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Crypto from "../components/Crypto.jsx";
import Forex from "../components/Forex.jsx";
import StockMarket from "../components/StockMarket.jsx";
import ChatBot from "../components/ChatBot.jsx";
function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
   
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <App/> },
        {path:"crypto",element:<Crypto/> },
        {path:"stock",element:<StockMarket/>},
        {path:"forex",element:<Forex/>},
        {path:"chatbot",element:<ChatBot/>}

    ],

  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
