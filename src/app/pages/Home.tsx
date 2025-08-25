import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NetworkTab from '../components/blocks/NetworkTab'
import TokenBance from '../components/blocks/TokenBance'
import TokenInfo from '../components/blocks/TokenInfo'
import { saveToStorage, getFromStorage } from '../hooks/useChromeStorage';
import toast, { Toaster } from 'react-hot-toast'
function Home({ openFullTab }: { openFullTab?: () => void }) {
    useEffect(() => {
        const checkWallet = async () => {
            const wallet = await getFromStorage("data");
        };
        checkWallet();
    }, []);
    const handleSet = async () => {
        await saveToStorage("wallet", "0x123...");
        toast.success("Wallet loaded successfully!");
    };
    return (
        <div>
            <Toaster position="top-right" />
            <NetworkTab />
            <div className='flex w-full sm:mt-5 mt-0'>
                <div className="sm:w-5/12 w-full sm:border-r border-0 border-gray-700 sm:pr-6 p-0 space-y-4 overflow-y-auto sm:min-h-[600px]">
                    <TokenInfo />
                </div>
                <div className="w-7/12 px-5 hidden sm:block">
                    <TokenBance />
                </div>
                {/* <button
                    onClick={() => saveToStorage("wallet", "0x123...")}
                >lưu</button> */}
            </div>

        </div>
    )
}

export default Home