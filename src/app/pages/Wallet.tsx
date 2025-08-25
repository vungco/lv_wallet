import React from "react";
import WalletList from "../components/blocks/WalletList";
import WalletDetail from "../components/blocks/WalletDetail";
import { useWallets } from "../contexts/WalletContext";

const WalletPage = () => {
    const { wallets, selectedId, setSelectedId, updateWallet, addWallet } = useWallets();

    // Ví dụ thêm ví mới
    const handleAdd = () => {
        const newWallet = {
            id: Date.now(),
            name: `Wallet ${wallets.length + 1}`,
            address: "0x" + Math.random().toString(16).slice(2, 10),
            balance: 0,
            privateKey: "newKey",
            img: "https://i.pravatar.cc/150?u=" + Date.now(), // avatar random
        };
        addWallet(newWallet);
    };

    return (
        <div className="flex gap-5 mt-5 w-4/5">
            <div className="w-1/2">
                <WalletList
                    wallets={wallets}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                // onAdd={handleAdd} // nếu bạn muốn nút thêm ví
                />
            </div>
            <div className="w-1/2">
                <WalletDetail
                    wallet={wallets.find((w) => w.id === selectedId) || null}
                    onSave={updateWallet} // dùng luôn hàm trong context
                />
            </div>
        </div>
    );
};

export default WalletPage;
