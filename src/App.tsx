import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";

function App() {
  const openFullTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  };
  const isPopup = window.innerWidth <= 420 && window.innerHeight <= 620;
  return (
    <Router>
      <div
        className={` bg-[#131719] text-[16px] ${isPopup ? "w-[400px] h-[600px]" : "w-full h-screen"
          } `}
      >
        <Routes>
          <Route path="/" element={<Home openFullTab={openFullTab} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
