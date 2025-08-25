import React from 'react'
import { X, Copy, Expand } from "lucide-react";
import { Search, User, Settings, Trash } from "lucide-react";
import WalletList from './WalletList';
import { useWallets } from '../../contexts/WalletContext';
import { FaExpand } from "react-icons/fa";

interface ProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
    const { wallets, selectedId, setSelectedId, updateWallet, addWallet } = useWallets();
    const openFullTab = () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1c1f24] text-white rounded-2xl shadow-lg w-[380px] p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={22} />
                </button>

                {/*  */}
                <div className='flex items-center'>
                    <div className='h-[30px] w-[30px] rounded-full text-white text-[20px] p-1 flex items-center justify-center bg-gradient-to-r from-green-200 to-green-600'>
                        P1
                    </div>
                    <p className='text-[24px] font-[500] text-white mx-2'>Profile 1</p>
                </div>
                {/*  */}

                <WalletList
                    wallets={wallets}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                // onAdd={handleAdd} // nếu bạn muốn nút thêm ví
                />
                <div className='flex items-center justify-around border-t border-gray-500 pt-3'>
                    <button className='p-2 flex items-center justify-center bg-[#CCF9FF1A] hover:bg-gray-500 rounded-sm w-[200px]'>Lock</button>
                    <button className='p-2 flex items-center justify-center bg-[#CCF9FF1A] hover:bg-gray-500 rounded-sm'><Settings size={20} /></button>
                    <button
                        onClick={openFullTab}
                        className='p-2 flex items-center justify-center bg-[#CCF9FF1A] hover:bg-gray-500 rounded-sm'><Expand size={20} /></button>
                </div>
            </div>
        </div>
    )
}

export default Profile