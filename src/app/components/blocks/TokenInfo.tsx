import React from 'react'
import { Search, Plus, Shuffle } from 'lucide-react';
import { useNetwork } from '../../contexts/NetworkContext';
function TokenInfo() {
    const { networks, selected, setSelected } = useNetwork();
    return (
        <div className=" text-white ">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-4 sm:pb-4 px-3 sm:px-0 sm:border-b border-0 border-gray-700">
                <div className='bg-gray-950 sm:p-2 p-1 w-3/5 flex justify-between rounded-md'>
                    <button className="px-6 sm:py-2 py-1  w-full mx-1 bg-gray-800 rounded-md text-white font-semibold cursor-pointer hover:bg-gray-700">
                        Tokens
                    </button>
                    <button className="px-8 sm:py-2 py-1 w-full mx-1 bg-gray-950 rounded-md text-gray-400 font-semibold cursor-pointer hover:bg-gray-700">
                        NFTs
                    </button>
                </div>
                <div className="flex gap-2 sm:ml-auto sm:pl-0 pl-4 w-2/5 justify-between">
                    <button className="bg-gray-600 sm:p-4 p-2 rounded-md  cursor-pointer hover:bg-gray-700">
                        <Search size={20} />
                    </button>
                    <button className="bg-gray-600 sm:p-4 p-2 rounded-md cursor-pointer hover:bg-gray-700">
                        <Shuffle size={20} />
                    </button>
                    <button className="bg-gray-600 sm:p-4 p-2 rounded-md cursor-pointer hover:bg-gray-700">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Token Card */}
            <div className="sm:bg-gray-700 bg-[#131719] sm:py-3 py-0 mt-2 flex items-center justify-between text-[18px] px-4 rounded-md">
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
                        <div className="font-semibold sm:text-[16px] text-[14px]">{selected?.name} Coin</div>
                        <div className="sm:text-[16px] text-[14px]"> 0.00 {selected?.nativeCurrency.symbol}</div>
                    </div>
                </div>
                {/* <div className="font-semibold text-white text-right">${selectedNetwork.price}</div> */}
            </div>
        </div>
    )
}

export default TokenInfo