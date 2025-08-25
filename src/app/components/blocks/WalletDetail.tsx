import React, { useState } from "react";

interface Wallet {
    id: number;
    name: string;
    address: string;
    balance: number;
    privateKey: string;
    img?: string;
}

interface WalletDetailProps {
    wallet: Wallet | null;
    onSave: (wallet: Wallet) => void;
}

const WalletDetail: React.FC<WalletDetailProps> = ({ wallet, onSave }) => {
    const [name, setName] = useState(wallet?.name || "");
    const [showKey, setShowKey] = useState(false);

    if (!wallet) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a wallet to view details
            </div>
        );
    }

    const handleSave = () => {
        onSave({ ...wallet, name });
    };

    return (
        <div className="p-6 rounded-lg border-l border-gray-700">
            <h2 className="text-2xl font-bold mb-4">{wallet.name}</h2>
            <div className="flex items-center gap-4 bg-[#CCF9FF1A] p-4 rounded-lg">
                <img
                    src={wallet.img}
                    alt="avatar"
                    className="w-14 h-14 rounded-lg"
                />
                <div>
                    <p className="text-sm text-gray-400">{wallet.address}</p>
                    <button
                        className="text-xs text-blue-400 hover:underline"
                        onClick={() => navigator.clipboard.writeText(wallet.address)}
                    >
                        Copy
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <label className="text-gray-400 text-[20px]">Wallet name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg mt-3 bg-gray-800 outline-none"
                />
                <button
                    onClick={handleSave}
                    className="w-[120px] mt-5 py-2 bg-[#80EF6E] text-black rounded hover:shadow-[0_0_20px_rgba(144,238,144,0.7)]"
                >
                    Save
                </button>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4">
                <p className="font-medium">🔑 Private key</p>
                <p className="text-sm text-gray-400">Export the private key of this wallet.</p>
                <button
                    className="mt-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    Reveal key
                </button>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
                <p className="font-medium">Secret phrase</p>
                <p className="text-sm text-gray-400">
                    This wallet is created with a Secret Phrase. It is the same for all wallets that were created with it in this profile. The only difference is the derivation path.</p>
                <button
                    className="mt-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    Reveal phrase
                </button>

            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
                <button
                    className="mt-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-red-700"
                >
                    Remove wallet
                </button>
            </div>
        </div>
    );
};

export default WalletDetail;
