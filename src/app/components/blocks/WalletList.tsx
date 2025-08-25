import React from "react";
import { Plus } from "lucide-react";
import { Search, User, Edit, Trash } from "lucide-react";


interface Wallet {
    id: number;
    name: string;
    address: string;
    balance: number;
    privateKey: string;
    img?: string;
}

interface WalletListProps {
    wallets: Wallet[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    // onAdd: () => void;
}

const WalletList: React.FC<WalletListProps> = ({ wallets, selectedId, onSelect }) => {
    const openWalletlist = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.update(tabs[0].id, {
                    url: chrome.runtime.getURL("index.html#/wallet"),
                });
            }
        });
    };
    return (
        <div className="w-full p-4  flex flex-col gap-4 ">
            <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Type name or address to search..."
                        className="ml-2 w-[180px] bg-transparent outline-none placeholder-gray-500"
                    />
                </div>
                <button
                    // onClick={onAdd}
                    className=" items-center sm:flex hidden w-full gap-1 px-3 py-2 bg-[#CCF9FF1A] rounded-lg text-gray-300 hover:text-white"
                >
                    + <User className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={openWalletlist}
                    title="Profile"
                    className=" items-center sm:hidden flex  w-full gap-1 px-3 py-2 bg-[#CCF9FF1A] rounded-lg text-gray-300 hover:text-white"
                >
                    <User className="w-6 h-6 text-white" />
                </button>
            </div>

            <div className="flex flex-col gap-3 mt-5 md:static md:h-auto md:overflow-visible overflow-y-auto">
                {wallets.map((w) => (
                    <div
                        key={w.id}
                        onClick={() => onSelect(w.id)}
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 
              ${selectedId === w.id ? "bg-[#CCF9FF1A]" : " hover:bg-[#CCF9FF1A]"}`}
                    >
                        <img
                            src={w.img}
                            alt="avatar"
                            className="w-16 h-16 rounded-lg"
                        />
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="font-semibold">{w.name}</p>
                                <p className="text-xs text-gray-400">{w.address.slice(0, 6)}...{w.address.slice(-4)}</p>
                            </div>
                            <p className="text-sm font-medium"> {w.balance} $</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WalletList;
