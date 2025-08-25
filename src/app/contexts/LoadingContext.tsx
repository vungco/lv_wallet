import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
    loading: boolean;
    setLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {loading && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex items-center justify-center z-[9999]">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error("useLoading must be used inside LoadingProvider");
    return ctx;
};
