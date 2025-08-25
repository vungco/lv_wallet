import SidebarItem from "./SidebarItem";
import {
    Wallet,
    Settings,
    Send,
    ArrowDownToLine,
    Activity,
    Home,
    Coins,
    User,
    LifeBuoy,
    ArrowLeftRight,
    Plus,
    History
} from "lucide-react";
import { useState } from "react";
import Receive from "../../pages/Receive";
export default function Sidebar() {
    const [openReceive, setOpenReceive] = useState(false);
    return (
        <aside className=" dark:bg-gray-800 text-[20px] flex-col gap-4 min-h-screen px-10 py-3 border-r border-gray-700">
            <div className=" text-[20px] font-bold text-yellow-400 flex items-center justify-center">
                <img src="/logo1.png" alt="Logo" className="w-12 h-12 mr-2" />
                LV Wallet
            </div>
            <nav className="flex flex-col gap-3 text-gray-300 text-sm border-t border-gray-700 pt-4">
                <SidebarItem href="/" label="Home" icon={<Home />} />
                <SidebarItem href="/transaction" label="Activity" icon={<Activity />} />
                <SidebarItem href="/send" label="Send" icon={<Send />} />
                <div onClick={() => setOpenReceive(true)}><SidebarItem href="#" label="Receive" icon={<ArrowDownToLine />} /></div>
                <SidebarItem href="/buy" label="Buy" icon={<Plus />} />
                <SidebarItem href="/swap" label="Swap" icon={<ArrowLeftRight />} />


                <div className="mt-4 border-t border-gray-700 pt-4 flex flex-col gap-3">
                    <SidebarItem href="/contact" label="Contact" icon={<User />} />

                    <SidebarItem href="/wallet" label="Wallets" icon={<Wallet />} />
                    <SidebarItem href="/seting" label="Settings" icon={<Settings />} />
                    <SidebarItem href="/support" label="Support" icon={<LifeBuoy />} />
                </div>
            </nav>
            <Receive
                isOpen={openReceive}
                onClose={() => setOpenReceive(false)}
                address='0x997c7a2fc1Fc2dB6b32325A850CaaE17ca3cb201'
                walletName="Wallet 1"
            />
        </aside>
    );
}