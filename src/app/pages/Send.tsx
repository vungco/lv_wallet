import React, { useState, useEffect } from 'react'
import { useNetwork } from '../contexts/NetworkContext'
import NetworkTab from '../components/blocks/NetworkTab'
import { ChevronDown } from 'lucide-react';
import { FiSearch } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

function Send() {
    const [tab, setTab] = useState<"token" | "nft">("token");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { networks, selected, setSelected } = useNetwork();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const balance = 0;
    const symbol = "ETH";
    const handleMax = () => {
        setAmount(balance.toString());
    };
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setAddress(text);
        } catch (err) {
            console.error("Failed to read clipboard: ", err);
        }
    };
    return (
        <div>
            <NetworkTab />
            <div className="w-full mt-3 text-white flex">
                {/* Menu trái */}
                <div className="w-1/3 p-4 border-r border-gray-500">
                    <div
                        onClick={() => setTab("token")}
                        className={`cursor-pointer py-5 text-[18px] hover:bg-[#1d2226] px-3 rounded-lg mb-2 ${tab === "token" ? "bg-[#1d2226]" : ""
                            }`}
                    >
                        Token
                        <p className="text-[16px] text-gray-400">
                            Send gas tokens or other fungible coins such as (ERC20)
                        </p>
                    </div>

                    <div
                        onClick={() => setTab("nft")}
                        className={`cursor-pointer py-5 px-3 text-[18px] hover:bg-[#1d2226] rounded-lg ${tab === "nft" ? "bg-[#1d2226]" : ""
                            }`}
                    >
                        NFT
                        <p className="text-[16px] text-gray-400">
                            Send NFTs or other non-fungible tokens (ERC721, ERC1155)
                        </p>
                    </div>
                </div>

                {/* Khung bên phải */}
                <div className='w-2/3 p-4'>
                    <div className='w-2/3'>
                        <p className='text-[20px] text-gray-500'>Token</p>
                        {/* token & nft */}
                        {tab === "token" && (
                            <div
                                onClick={() => setOpen(!open)}
                                className="bg-[#1d2226] relative mt-1 flex items-center justify-between text-[18px] p-4 rounded-md">
                                <div className="flex items-center gap-4 ">
                                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                        {/* icon token */}
                                        <img
                                            src={`/icon/${selected?.nativeCurrency.symbol}.png`}
                                            alt={selected?.name}
                                            className="w-[40px] h-[40px] rounded-full border-2 border-gray-300 hover:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{selected?.nativeCurrency.symbol}</div>

                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className="font-semibold mx-2 text-white text-right">
                                        <div className="text-[16px]"> 0.00 {selected?.nativeCurrency.symbol}</div>
                                        <div className="text-[16px]"> 0.00 $</div>
                                    </div>
                                    <ChevronDown size={18} />
                                </div>

                                {open && (
                                    <div className="mt-2 bg-[#1d2226] h-[200px] z-50 absolute w-full top-[80px] left-0 rounded-lg p-3 shadow-lg">
                                        {/* Ô search */}
                                        <div className="flex items-center bg-[#131719] px-2 py-2 rounded mb-3">
                                            <FiSearch className="text-gray-400 mr-2" />
                                            <input
                                                type="text"
                                                placeholder="Type name to search..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="bg-transparent outline-none flex-1 text-sm"
                                            />
                                        </div>

                                        {/* Danh sách token */}
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            <div

                                                className="flex justify-between items-center p-2 rounded hover:bg-[#2a2f34] cursor-pointer"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img src={`/icon/${selected?.nativeCurrency.symbol}.png`} alt="{token.symbol}" className="w-6 h-6 rounded-full" />
                                                    <div>
                                                        <p className="font-semibold">{selected?.nativeCurrency.symbol}</p>
                                                        <p className="text-xs text-gray-400">{selected?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p>
                                                        0 {selected?.nativeCurrency.symbol}
                                                    </p>
                                                    <p className="text-xs text-gray-400">${selected?.priceUsd}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                        {tab === "nft" && (
                            <div className='w-full p-3 flex items-center bg-[#1d2226] mt-5 rounded-lg text-[18px] '>
                                <img src="https://cdn-icons-png.freepik.com/512/25/25666.png" alt="NFT Icon" className='w-[70px] h-[70px] mr-3' />
                                <p className='text-gray-400'>There are no NFTs on this wallet</p>

                            </div>
                        )}

                        <p className='text-[20px] text-gray-500 mt-5'>Recipient</p>

                        <div className="flex items-center bg-[#1d2226] mt-5 h-[100px] rounded-lg px-3 py-2">
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="0x0000000000000000000000000000000000000000"
                                className="flex-1 h-full bg-transparent outline-none text-sm text-white"
                            ></textarea>
                            <button
                                type="button"
                                onClick={handlePaste}
                                className="ml-2 flex items-center text-sm text-gray-300 hover:text-white"
                            >
                                📋 Paste
                            </button>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <p className='text-[20px] text-gray-500 '>Amount</p>
                            <button onClick={handleMax} className='text-white bg-gray-500 hover:bg-gray-600 text-[16px] p-1 rounded-lg'>MAX</button>
                        </div>

                        <div
                            className={`flex items-center mt-5 px-3 py-2 rounded-lg border ${Number(amount) > balance
                                ? "border-red-500"
                                : "border-transparent bg-[#1d2226]"
                                }`}
                        >
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="flex-1  bg-transparent outline-none text-[16px] py-2 text-white appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-inner-spin-button]:m-0 
                                [&::-webkit-outer-spin-button]:m-0
                                [moz-appearance:textfield]"
                            />
                            <span className="ml-2 text-gray-400">{symbol}</span>
                        </div>

                        {Number(amount) > balance && (
                            <p className="text-red-500 text-xs mt-1">
                                The maximum amount is {balance} {symbol}
                            </p>
                        )}

                        <div className='w-full border rounded mt-5 p-4 border-red-500 flex items-center justify-center'>
                            Insufficient ETH for transaction (gas) fee. Check your account balance. Use Buy or Swap feature to add more if necessary.
                        </div>
                        <div className="mt-5 flex items-center justify-center">
                            <button
                                className={`w-[250px] py-4 rounded-xl font-bold transition-all 
                            bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white
                            }`}
                            >
                                Transfer
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Send