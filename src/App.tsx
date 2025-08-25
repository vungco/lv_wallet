import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import HomeLayout from "./app/components/layouts/HomeLayout";
import AccountLayout from "./app/components/layouts/AccountLayout";
import AddAccount from "./app/components/blocks/AddAccount";
import Verify from "./app/components/blocks/Verify";
import SetupPassword from "./app/components/blocks/SetupPassword";
import Send from "./app/pages/Send";
import Receive from "./app/pages/Receive";
import Swap from "./app/pages/Swap";
import Buy from "./app/pages/Buy";
import { LoadingProvider } from "./app/contexts/LoadingContext";
import Contract from "./app/pages/Contact";
import Wallet from "./app/pages/Wallet";
import { WalletProvider } from "./app/contexts/WalletContext";
import { getFromStorage } from "./app/hooks/useChromeStorage";

function App() {
  const openFullTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  };
  const isPopup = window.innerWidth <= 420 && window.innerHeight <= 620;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkWallets = async () => {
      if (!isPopup) {
        setChecked(true);
        return;
      }

      const wallets = await getFromStorage<any[]>("wal");
      if (wallets && wallets.length > 0) {
        navigate("/login", { replace: true });
      } else {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html#/register") });
        window.close();
      }
      setChecked(true);
    };
    checkWallets();
  }, [isPopup]);

  if (!checked) return null;

  return (
    <LoadingProvider>
      <WalletProvider>
        <div
          className={`bg-[#131719] text-[16px] ${isPopup ? "w-[400px] h-[600px]" : "w-full h-screen"
            }`}
        >
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home openFullTab={openFullTab} />} />
              <Route path="/send" element={<Send />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/contact" element={<Contract />} />
              <Route path="/wallet" element={<Wallet />} />
            </Route>
            <Route element={<AccountLayout />}>
              <Route path="/addaccount" element={<AddAccount />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/setuppassword" element={<SetupPassword />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </WalletProvider>
    </LoadingProvider>
  );
}

export default App;
