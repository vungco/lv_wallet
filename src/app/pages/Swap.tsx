import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function SwapUI() {
    const [fromToken, setFromToken] = useState("ETH");
    const [toToken, setToToken] = useState("USDT");
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [selectType, setSelectType] = useState<"from" | "to">("from");
    const [network, setNetwork] = useState("Ethereum");

    const handleSwapDirection = () => {
        setFromToken(toToken);
        setToToken(fromToken);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#131719] text-white px-4">
            <div className="w-[400px] bg-[#1c1f26] p-5 rounded-2xl shadow-lg text-white space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Swap</h2>
                    <select
                        value={network}
                        onChange={(e) => setNetwork(e.target.value)}
                        className="bg-gray-800 px-3 py-2 rounded-lg text-sm focus:outline-none"
                    >
                        <option>Ethereum</option>
                        <option>Binance Smart Chain</option>
                        <option>Polygon</option>
                        <option>Arbitrum</option>
                    </select>
                </div>

                {/* From input */}
                <div className="bg-[#2a2f3a] p-3 rounded-xl flex justify-between items-center">
                    <input
                        type="number"
                        placeholder="0.0"
                        className="bg-transparent outline-none text-lg w-2/3"
                    />
                    <button
                        onClick={() => {
                            setSelectType("from");
                            setShowTokenModal(true);
                        }}
                        className="bg-[#3a3f4a] px-3 py-1 rounded-lg text-sm"
                    >
                        {fromToken} ▼
                    </button>
                </div>

                {/* Swap button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSwapDirection}
                        className="bg-[#3a3f4a] p-2 rounded-full hover:bg-[#505565] transition"
                    >
                        <FaExchangeAlt />
                    </button>
                </div>

                {/* To input */}
                <div className="bg-[#2a2f3a] p-3 rounded-xl flex justify-between items-center">
                    <input
                        type="number"
                        placeholder="0.0"
                        className="bg-transparent outline-none text-lg w-2/3"
                    />
                    <button
                        onClick={() => {
                            setSelectType("to");
                            setShowTokenModal(true);
                        }}
                        className="bg-[#3a3f4a] px-3 py-1 rounded-lg text-sm"
                    >
                        {toToken} ▼
                    </button>
                </div>

                {/* Info */}
                <div className="bg-[#2a2f3a] p-3 rounded-xl text-sm space-y-1">
                    <p>Best Route: Uniswap → 1inch</p>
                    <p>Slippage: 0.5%</p>
                    <p>Allowance: Not Approved</p>
                </div>

                {/* Action Button */}
                <button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-yellow-500 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                    Swap
                </button>

                {/* Token Modal */}
                {showTokenModal && (
                    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                        <div className="bg-[#1e222a] p-4 rounded-xl w-80 space-y-2">
                            <h3 className="text-lg font-bold mb-2">Select Token</h3>
                            {["ETH", "USDT", "DAI", "WBTC"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => {
                                        if (selectType === "from") setFromToken(t);
                                        else setToToken(t);
                                        setShowTokenModal(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded hover:bg-[#2a2f3a]"
                                >
                                    {t}
                                </button>
                            ))}
                            <button
                                onClick={() => setShowTokenModal(false)}
                                className="w-full mt-2 bg-gradient-to-r from-pink-500 to-yellow-500 py-1 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
