import React, { createContext, useState, ReactNode } from "react";

type SeedContextType = {
    secret: string[];
    setSecret: (s: string[]) => void;
    resetSecret: () => void;
};

export const SeedContext = createContext<SeedContextType>({
    secret: [],
    setSecret: () => { },
    resetSecret: () => { }
});

export const SeedProvider = ({ children }: { children: ReactNode }) => {
    const [secret, setSecret] = useState<string[]>([]);
    const resetSecret = () => setSecret([]);

    return (
        <SeedContext.Provider value={{ secret, setSecret, resetSecret }}>
            {children}
        </SeedContext.Provider>
    );
};
