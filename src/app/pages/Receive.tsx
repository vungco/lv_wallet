import React from "react";
import QRCode from "react-qr-code";
import { X, Copy } from "lucide-react";

interface ReceiveProps {
    isOpen: boolean;
    onClose: () => void;
    address: string;
    walletName?: string;
}

const Receive: React.FC<ReceiveProps> = ({ isOpen, onClose, address, walletName = "Wallet 1" }) => {
    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        alert("Copied!");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1c1f24] text-white rounded-2xl shadow-lg w-[380px] p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={22} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-center mb-4">Receive <span className="text-blue-400">ETH</span></h2>

                {/* Wallet address */}
                <div className="bg-[#2a2e35] rounded-lg p-3 flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">{walletName}</span>
                        <span className="font-mono text-sm break-all">{address}</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-700 rounded-lg"
                    >
                        <Copy size={18} />
                    </button>
                </div>

                {/* QR code */}
                <div className="flex justify-center mb-4">
                    <div className="bg-white p-2 rounded-lg">
                        <QRCode value={address} size={140} />
                    </div>
                </div>

                {/* Info text */}
                <p className="text-sm text-gray-400 text-center mb-4">
                    This address can be used to receive funds. <br />
                    Share it with someone or use it for withdrawals on exchanges.
                </p>

                {/* Copy media */}
                <button
                    onClick={handleCopy}
                    className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-semibold"
                >
                    Copy media
                </button>
            </div>
        </div>
    );
};

export default Receive;
