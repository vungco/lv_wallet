import React, { useState } from 'react'
import { Copy } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Receive from '../../pages/Receive';
import { FaExpand } from "react-icons/fa";
import Profile from './Profile';
import { useWallets } from '../../contexts/WalletContext';
function Header() {
    const { wallets, selectedId, setSelectedId, updateWallet, addWallet, getSelectedWallet } = useWallets();
    const [copied, setCopied] = React.useState(false);
    const [openReceive, setOpenReceive] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const wallet = getSelectedWallet();
    const handleCopy = () => {
        if (!wallet?.address) return;
        navigator.clipboard.writeText(wallet?.address);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 1000);
    };
    const openSend = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.update(tabs[0].id, {
                    url: chrome.runtime.getURL("index.html#/send"),
                });
            }
        });
    };

    const openBuy = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.update(tabs[0].id, {
                    url: chrome.runtime.getURL("index.html#/buy"),
                });
            }
        });
    };

    const openSwap = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.update(tabs[0].id, {
                    url: chrome.runtime.getURL("index.html#/swap"),
                });
            }
        });
    };
    const openFullTab = () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    };
    return (
        <div>
            <div className="hidden sm:flex w-full h-[60px]  text-white  items-center justify-between border-b border-gray-700">
                <Toaster position="top-right" />
                <h4 className="text-sm sm:text-2xl font-bold"> 0,00 $</h4>
                <div className='flex items-center'>
                    <div className="flex items-center bg-zinc-700 text-white rounded-full px-4 py-1 gap-2 cursor-pointer hover:bg-zinc-800 transition me-5"
                        onClick={handleCopy} >
                        <span className="text-sm font-mono">{wallet?.address?.slice(0, 6)}...${wallet?.address?.slice(-4)}</span>
                        <Copy size={16} />
                    </div>
                    <p className='mx-1'>Wallet 1</p>
                    <div className="cursor-pointer relative mx-1"
                        onClick={() => setOpenProfile(true)}>
                        <img
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-dep-cho-nam-2.jpg"
                            alt="avatar"
                            className="w-[40px] h-[40px] rounded-full border-2 border-gray-300 hover:border-green-500"
                        />
                    </div>
                </div>
            </div>
            {/* extension header */}
            <div className='sm:hidden bg-gradient-to-b h-[220px] p-2 from-[#479877] to-green-400 flex flex-col items-center'>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex items-center bg-[#479877] w-[50px] text-white rounded-full px-4 py-1 gap-2 cursor-pointer hover:bg-green-600 transition"
                        onClick={openFullTab}
                    >
                        <FaExpand size={20} />
                    </div>
                    <div className='flex items-center'>
                        <p className='mx-1'>Wallet 1</p>
                        <div className="cursor-pointer relative mx-1"
                            onClick={() => setOpenProfile(true)}>
                            <img
                                src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-dep-cho-nam-2.jpg"
                                alt="avatar"
                                className="w-[40px] h-[40px] rounded-full border-2 border-gray-300 hover:border-green-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center bg-[#479877] w-[170px] text-white rounded-full px-4 py-1 gap-2 cursor-pointer hover:bg-green-600 transition"
                    onClick={handleCopy} >
                    <span className="text-sm font-mono">{wallet?.address?.slice(0, 6)}...${wallet?.address?.slice(-4)}</span>
                    <Copy size={16} />
                </div>
                <h4 className="text-[24px] mt-1 font-bold"> 0,00 $</h4>
                <div className='flex px-16 w-full justify-between items-center mt-5'>
                    <div className='flex items-center justify-center flex-col'>
                        <button
                            onClick={openSend}
                            className='rounded-full w-[40px] h-[40px] flex text-[20px] items-center hover:bg-gray-500 justify-center bg-black text-white'>↑</button>
                        <p>Send</p>
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <button onClick={() => setOpenReceive(true)}
                            className='rounded-full w-[40px] h-[40px] flex text-[20px] items-center hover:bg-gray-500 justify-center bg-black text-white'>↓</button>
                        <p>Receive</p>
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <button
                            onClick={openBuy}
                            className='rounded-full w-[40px] h-[40px] flex text-[20px] items-center hover:bg-gray-500 justify-center bg-black text-white'>+</button>
                        <p>Buy</p>
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <button
                            onClick={openSwap}
                            className='rounded-full w-[40px] h-[40px] flex text-[20px] items-center hover:bg-gray-500 justify-center bg-black text-white'> ⇄</button>
                        <p>Swap</p>
                    </div>
                </div>

            </div>
            <Receive
                isOpen={openReceive}
                onClose={() => setOpenReceive(false)}
                address='0x997c7a2fc1Fc2dB6b32325A850CaaE17ca3cb201'
                walletName="Wallet 1"
            />
            <Profile
                isOpen={openProfile}
                onClose={() => setOpenProfile(false)}
            />
        </div>
    )
}

export default Header