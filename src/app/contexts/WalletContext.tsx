import React, { createContext, useContext, useState } from "react";

type Wallet = {
    id: number;
    name: string;
    address: string;
    balance: number;
    privateKey: string;
    img?: string;
};

type WalletContextType = {
    wallets: Wallet[];
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    addWallet: (wallet: Wallet) => void;
    updateWallet: (wallet: Wallet) => void;
    getSelectedWallet: () => Wallet | undefined;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wallets, setWallets] = useState<Wallet[]>([
        { id: 1, name: "Wallet 1", address: "0xd302b327", balance: 0, privateKey: "key1", img: "https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/avatar-facebook-26-1724578356.jpg" },
        { id: 2, name: "Wallet 2", address: "0xF6E63f1E", balance: 0, privateKey: "key2", img: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223" },
    ]);
    const [selectedId, setSelectedId] = useState<number | null>(1);

    const addWallet = (wallet: Wallet) => {
        setWallets((prev) => [...prev, wallet]);
        setSelectedId(wallet.id);
    };
    const getSelectedWallet = () => {
        return wallets.find((w) => w.id === selectedId);
    };

    const updateWallet = (wallet: Wallet) => {
        setWallets((prev) => prev.map((w) => (w.id === wallet.id ? wallet : w)));
    };

    return (
        <WalletContext.Provider value={{ wallets, selectedId, setSelectedId, addWallet, updateWallet, getSelectedWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallets = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallets must be used inside WalletProvider");
    return ctx;
};
