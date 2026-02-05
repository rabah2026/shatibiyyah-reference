"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "@/lib/storage";

type ThemeContextType = {
    fontSize: number;
    setFontSize: (size: number) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    fontSize: 24,
    setFontSize: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSizeState] = useState(24);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("shatibiyyah_font_size");
        if (saved) setFontSizeState(parseInt(saved, 10));
        setMounted(true);
    }, []);

    const setFontSize = (size: number) => {
        setFontSizeState(size);
        localStorage.setItem("shatibiyyah_font_size", size.toString());
    };

    if (!mounted) return <div style={{ opacity: 0 }}>{children}</div>;

    return (
        <ThemeContext.Provider value={{ fontSize, setFontSize }}>
            <div style={{ fontSize: `${fontSize}px` }} className="contents">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
