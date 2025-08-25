import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext";

export interface Network {
    name: string;
    chainId: number;
    rpcUrls: string[];
    nativeCurrency: { symbol: string };
    explorers?: { name: string; url: string }[];
    priceUsd?: number;
    isTestnet?: boolean;
}

interface NetworkContextType {
    networks: Network[];
    selected: Network | null;
    setSelected: (n: Network) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const useNetwork = () => {
    const ctx = useContext(NetworkContext);
    if (!ctx) throw new Error("useNetwork must be used inside NetworkProvider");
    return ctx;
};


const COINGECKO_MAPPING: Record<string, string> = {
    ETH: "ethereum",
    ARB: "arbitrum",
    MATIC: "polygon",
    BNB: "binancecoin",
    OP: "optimism",
    AVAX: "avalanche-2",
    BASE: "base",
    xDAI: "gnosis",
    SCR: "scroll",
    BLAST: "blast",
    WLD: "worldcoin",
    WEMIX: "wemix-token",
};

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
    const [networks, setNetworks] = useState<Network[]>([]);
    const [selected, setSelected] = useState<Network | null>(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                // 1. Lấy danh sách chain
                const { data: allChains } = await axios.get("https://chainid.network/chains.json");

                // ~20 mạng phổ biến
                const ids = [
                    "Ethereum Mainnet", "Arbitrum One", "Polygon Mainnet", "BNB Smart Chain Mainnet",
                    "Optimism", "Avalanche C-Chain", "Base", "Gnosis", "Scroll", "Blast",
                    "Ethereum Sepolia", "Arbitrum Sepolia", "Optimism Sepolia", "Base Sepolia",
                    "Avalanche Fuji", "BSC Testnet", "Polygon zkEVM Testnet", "Gnosis Chiado",
                    "Scroll Testnet", "Blast Testnet"
                ];
                const selectedChains = (allChains as any[]).filter(c => ids.includes(c.name));

                // 2. Chuẩn bị danh sách id cho CoinGecko
                const idsParam = selectedChains
                    .map(c => COINGECKO_MAPPING[c.nativeCurrency.symbol])
                    .filter(Boolean)
                    .join(",");

                const { data: priceData } = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
                    params: { ids: idsParam, vs_currencies: "usd" }
                });

                // 3. Merge dữ liệu
                const enriched: Network[] = selectedChains.map((c: any) => {
                    const cgId = COINGECKO_MAPPING[c.nativeCurrency.symbol];
                    return {
                        name: c.name,
                        chainId: c.chainId,
                        rpcUrls: c.rpc || [],
                        nativeCurrency: c.nativeCurrency,
                        explorers: c.explorers,
                        priceUsd: cgId ? priceData[cgId]?.usd : undefined,
                        isTestnet: c.name.toLowerCase().includes("test")
                    };
                });

                setNetworks(enriched);
                setSelected(enriched[0] || null);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return (
        <NetworkContext.Provider value={{ networks, selected, setSelected }}>
            {children}
        </NetworkContext.Provider>
    );
};
