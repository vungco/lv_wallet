import React, { useEffect, useState } from 'react'
import { useNetwork } from '../../contexts/NetworkContext';
import { ChevronDown } from 'lucide-react';

function NetworkTab() {
    const { networks, selected, setSelected } = useNetwork();

    const [tokens, setTokens] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [mainNetworks, setMainNetworks] = useState<any[]>([]);
    const [extraNetworks, setExtraNetworks] = useState<any[]>([]);
    useEffect(() => {
        setTokens(networks);

    }, [networks]);
    useEffect(() => {
        const idx = tokens.findIndex((n) => n.name === selected?.name);
        if (idx >= 0) setSelectedIdx(idx);
    }, [selected]);

    useEffect(() => {
        setMainNetworks(tokens.slice(0, 3));
        setExtraNetworks(tokens.slice(3));
    }, [tokens]);
    const handleSelect = (idx: number) => {
        setSelectedIdx(idx);
        setSelected(tokens[idx]);
    };
    const handleSelectExtra = (idx: number) => {
        const selected = extraNetworks[idx];
        const newNetworks = [
            selected,
            ...tokens.filter((n) => n.name !== selected.name),
        ];
        setTokens(newNetworks);
        setSelectedIdx(0);
        setSelected(selected);
        setShowDropdown(false);
    };
    return (
        <>
            <div className='sm:border-b border-0 border-gray-500 p-5 relative'>
                <div className=" gap-3 hidden sm:flex">
                    {mainNetworks.map((net, idx) => {
                        const isSelected = selectedIdx === idx;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`flex px-4 py-2 w-1/4 items-center justify-between cursor-pointer rounded-lg h-16 transition-all duration-200  ${isSelected
                                    ? 'bg-yellow-500 text-black'
                                    : 'bg-gray-700 text-white'
                                    } bg-gray-700`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={`/icon/${net.nativeCurrency.symbol}.png`}
                                        alt={net.name}
                                        className="w-[40px] h-[40px] rounded-full border-2 border-gray-300 hover:border-green-500"
                                    />
                                    <div className="mx-4">
                                        <p className="font-semibold">{net.name.length > 15 ? net.name.substring(0, 15) + "..." : net.name}</p>

                                        <p className="text-sm">{!isNaN(Number(net.priceUsd))
                                            ? Number(net.priceUsd).toFixed(2)
                                            : "0.00"}$</p>
                                    </div>
                                </div>
                                {isSelected && <span className="text-xl hidden sm:block">︙</span>}
                            </div>
                        );
                    })}

                    {extraNetworks.length > 0 && (
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="relative flex items-center px-10 py-2  bg-gray-800 text-white rounded-lg h-16 cursor-pointer"
                        >
                            <div className="flex items-center space-x-2">

                                <p className="font-semibold"> {extraNetworks.length} more </p>
                                <ChevronDown size={18} />
                            </div>


                        </div>
                    )}
                </div>
                {showDropdown && (
                    <div className="my-scroll absolute top-[110%]  right-0 bg-gray-700 rounded-lg shadow-lg z-[100] w-[300px] h-[200px]">

                        <div>

                        </div>
                        {extraNetworks.map((net, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelectExtra(i)}
                                className={`flex items-center justify-between gap-3 p-3 hover:bg-gray-600 cursor-pointer rounded-lg border-2 ${networks[selectedIdx].name === net.name
                                    ? 'border-yellow-500'
                                    : 'border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`/icon/${net.nativeCurrency.symbol}.png`}
                                        alt={net.name}
                                        className="w-[30px] h-[30px] rounded-full border"
                                    />
                                    <div>
                                        <p className="font-semibold">{net.name}</p>
                                        <p className="text-sm">{!isNaN(Number(net.priceUsd))
                                            ? Number(net.priceUsd).toFixed(2)
                                            : "0.00"}</p>
                                    </div>
                                </div>
                                {tokens[selectedIdx].name === net.name && (
                                    <span className="text-xl">︙</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {/* extension network */}
                <div className='flex sm:hidden items-center justify-between p-2 rounded-xl bg-[#CCF9FF0D]'
                    onClick={() => setShowDropdown(!showDropdown)}>
                    <div className='flex items-center justify-center'>
                        <img src={`/icon/${selected?.nativeCurrency.symbol}.png`}
                            alt={selected?.name}
                            className="w-[32px] h-[32px] rounded-full border-2 border-gray-300 hover:border-green-500" />
                        <p className='mx-2 font-[500]'>{selected?.name}</p>
                    </div>
                    <div className='flex items-center justify-center font-[500]'>
                        <p className='mx-2'>0,00 $</p>
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NetworkTab