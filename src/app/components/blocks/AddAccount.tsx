import React, { useState, useEffect, useContext } from 'react';
import { FiEdit, FiAlertTriangle, FiEyeOff } from "react-icons/fi";
import { Shield } from "lucide-react";
import { ethers } from "ethers";
import { useNavigate, useLocation } from 'react-router-dom';
import { SeedContext } from '../../contexts/SeedContext';

function AddAccount() {
    const [revealed, setRevealed] = useState(false);
    const { secret, setSecret } = useContext(SeedContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (secret.length === 0) {
            const wallet = ethers.Wallet.createRandom();
            if (wallet.mnemonic) {
                setSecret(wallet.mnemonic.phrase.split(" "));
            }
        }
    }, [secret, setSecret]);

    const handleCopy = () => {
        navigator.clipboard.writeText(secret.join(" "));
        alert("Copied to clipboard!");
    };
    const handleSaved = () => {
        navigate("/verify");
    };

    return (
        <div className='w-full h-full px-[120px]'>
            <p className='text-center font-[600] text-white text-[30px] mt-5'>Secret Phrase</p>
            <div className='flex text-white mt-10' >
                <div className='w-5/12 px-8'>
                    <div className='mb-10 flex items-center'>
                        <FiEdit className='w-10 h-10' />
                        <p className="text-sm font-medium text-brand-light mx-3">Write down and store your Secret phrase in a safe place</p>
                    </div>
                    <div className='mb-10 flex items-center'>
                        <FiAlertTriangle className='w-10 h-10' />
                        <p className="text-sm font-medium text-brand-light mx-3">Your Secret phrase is the only way to recover your wallet</p>
                    </div>
                    <div className='mb-10 flex items-center'>
                        <Shield className='w-10 h-10' />
                        <p className="text-sm font-medium text-brand-light mx-3">Anyone with your Secret phrase can get full access to your wallet and funds</p>
                    </div>
                    <div className='mb-10 flex items-center'>
                        <FiEyeOff className='w-10 h-10' />
                        <p className="text-sm font-medium text-brand-light mx-3">Never share your Secret phrase with anyone. Your wallet's security depends on keeping this detail private</p>
                    </div>
                </div>
                <div className='w-7/12 flex px-8 justify-center flex-col items-center'>
                    <div className="grid grid-cols-3 gap-2 p-4 bg-[#FFFFFF0D] rounded cursor-pointer w-full">
                        {revealed ? (
                            secret.map((word, idx) => (
                                <div key={idx} className="p-2 rounded text-start">
                                    {idx + 1}. {word}
                                </div>
                            ))
                        ) : (
                            <div
                                className="col-span-3 flex flex-col items-center justify-center p-10 cursor-pointer rounded"
                                onClick={() => setRevealed(true)}
                            >
                                Click here to reveal your Secret Phrase
                            </div>
                        )}
                    </div>
                    <button
                        className="mt-5  text-white w-[200px] rounded hover:bg-gray-800  transition-colors duration-300 flex items-center justify-center p-1"
                        onClick={handleCopy}
                    >
                        <span className="inline-flex items-center transition transform duration-300">
                            Copy to clipboard
                        </span>
                    </button>
                </div>
            </div>
            <div className='border-t border-gray-500 py-3 flex items-center justify-center'>
                <button className='p-2 mt-2 bg-[#80EF6E] text-black text-[20px] rounded hover:shadow-[0_0_20px_rgba(144,238,144,0.7)]'
                    onClick={handleSaved}
                >I've saved the phrase </button>
            </div>
        </div>
    )
}

export default AddAccount;
