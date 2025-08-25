// use client
import { useLocation, Link } from "react-router-dom";
import { cn } from "../../utils/utils";
import { ReactNode } from "react";

type SidebarItemProps = {
    href: string;
    label: string;
    icon: ReactNode;
    iconColor?: string;
};

export default function SidebarItem({
    href,
    label,
    icon,
    iconColor = "bg-orange-400",
}: SidebarItemProps) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href} // Sử dụng `to` thay vì `href`
            className={cn(
                "flex items-center gap-3 sm:p-3 p-1 rounded-xl transition-colors text-[16px]",
                isActive
                    ? "bg-zinc-700 text-white font-semibold"
                    : "hover:bg-zinc-700 text-zinc-400"
            )}
        >
            <div className="relative">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full `}>
                    {icon}
                </div>
                {!isActive && (
                    <span className="absolute w-8 h-8 rounded-full bg-black opacity-30 left-0 top-0 -z-10" />
                )}
            </div>
            <span className="hidden sm:block">{label}</span>
        </Link>
    );
}