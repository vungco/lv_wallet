import React from "react";
import { Shield, Download, ScanLine } from "lucide-react";

function Register() {
    return (
        <div className="w-full h-screen bg-[#131719] flex items-center justify-center">
            <div className="bg-[#161B1E] rounded-3xl  shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] p-10 w-[480px]">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="bg-[#4ADE80] text-black font-bold text-2xl rounded-xl px-4 py-2">
                        W
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-white text-2xl font-semibold text-center">
                    Let's start your journey
                </h1>
                <p className="text-gray-400 text-center mb-10">
                    Join the future of finance with Wigwam
                </p>

                {/* Options */}
                <div className="space-y-4">
                    <button className="w-full flex items-center gap-4 bg-[#1D2226] hover:bg-[#242A2F] text-white p-4 rounded-2xl transition">
                        <Shield className="w-6 h-6 text-gray-300" />
                        <div className="text-left">
                            <p className="font-medium">Create a new wallet</p>
                            <p className="text-sm text-gray-400">
                                Start fresh with a new wallet from scratch
                            </p>
                        </div>
                    </button>

                    <button className="w-full flex items-center gap-4 bg-[#1D2226] hover:bg-[#242A2F] text-white p-4 rounded-2xl transition">
                        <Download className="w-6 h-6 text-gray-300" />
                        <div className="text-left">
                            <p className="font-medium">Import or recover wallet</p>
                            <p className="text-sm text-gray-400">
                                Using your own secret phrase or private key
                            </p>
                        </div>
                    </button>

                    <button className="w-full flex items-center gap-4 bg-[#1D2226] hover:bg-[#242A2F] text-white p-4 rounded-2xl transition">
                        <ScanLine className="w-6 h-6 text-gray-300" />
                        <div className="text-left">
                            <p className="font-medium">Ledger</p>
                            <p className="text-sm text-gray-400">
                                Connect your Ledger wallet
                            </p>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6">
                    <button className="text-gray-400 hover:text-white text-sm">
                        Support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
