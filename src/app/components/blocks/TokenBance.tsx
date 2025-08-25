import React, { useState } from 'react'
import { useNetwork } from '../../contexts/NetworkContext';
import { ChevronUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Receive from '../../pages/Receive';
function TokenBance() {
    const navigate = useNavigate();
    const { networks, selected, setSelected } = useNetwork();
    console.log("selected", selected);
    const [openReceive, setOpenReceive] = useState(false);
    const commonBtnStyle = "flex w-1/4 items-center gap-2 px-4 py-2 rounded-md justify-center text-white hover:shadow-[0_0_5px_rgba(255,255,255,0.2)]";
    const activeStyle = "bg-zinc-700 hover:bg-zinc-600 cursor-pointer";
    const disabledStyle = "bg-zinc-700 opacity-50 cursor-not-allowed";
    return (
        <div>
            <div className="flex items-center">
                <img src={`/icon/${selected?.nativeCurrency.symbol}.png`} alt={selected?.name} className="w-20 h-20 rounded-full mb-4" />
                <div className="mx-4">
                    <p className=" font-bold mb-4 text-[30px]">{selected?.name}</p>
                    <p className="text-zinc-400 text-[20px]">Price</p>
                    <p className="text-[24px] flex items-center">{selected?.priceUsd}$
                        <span className='mx-3 flex items-center gap-1 p-1 rounded-lg text-[14px] font-semibold text-white bg-green-500'> <ChevronUp size={14} className="text-white" />1.06%</span>
                    </p>
                </div>
            </div>
            <p className="mt-4 mb-2 text-[20px] text-zinc-400">Balance</p>
            <p className='text-[24px]'>$ 0.00</p>
            <p className="text-[24px] mt-2 text-zinc-400">0.00{selected?.nativeCurrency.symbol}</p>
            <div className="flex gap-2 justify-between mt-5 border-b border-gray-700 pb-4">
                <button
                    className={`${commonBtnStyle} ${activeStyle}`}
                    onClick={() => navigate("/send")}
                >
                    ↑ Send
                </button>

                <button
                    onClick={() => setOpenReceive(true)}
                    className={`${commonBtnStyle} ${activeStyle}`}
                >
                    ↓ Receive
                </button>

                <button
                    disabled
                    className={`${commonBtnStyle} ${disabledStyle}`}
                    onClick={() => navigate("/buy")}
                >
                    + Buy
                </button>

                <button

                    className={`${commonBtnStyle} ${activeStyle}`}
                    onClick={() => navigate("/swap")}
                >
                    ⇄ Swap
                </button>
            </div>
            <Receive
                isOpen={openReceive}
                onClose={() => setOpenReceive(false)}
                address='0x997c7a2fc1Fc2dB6b32325A850CaaE17ca3cb201'
                walletName="Wallet 1"
            />
        </div>
    )
}

export default TokenBance