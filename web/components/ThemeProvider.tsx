"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { storage, STORAGE_KEYS } from "@/lib/storage"

interface ThemeContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [fontSize, setFontSizeState] = React.useState(24);

    React.useEffect(() => {
        const saved = storage.get(STORAGE_KEYS.FONT_SIZE);
        if (saved) {
            setFontSizeState(parseInt(saved, 10));
        }
    }, []);

    const setFontSize = (size: number) => {
        setFontSizeState(size);
        storage.set(STORAGE_KEYS.FONT_SIZE, size.toString());
    };

    return (
        <NextThemesProvider {...props}>
            <ThemeContext.Provider value={{ fontSize, setFontSize }}>
                <div style={{ fontSize: `${fontSize}px` }} className="contents">
                    {children}
                </div>
            </ThemeContext.Provider>
        </NextThemesProvider>
    )
}

export function useTheme() {
    const context = React.useContext(ThemeContext);
    const nextTheme = useNextTheme();

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return {
        ...nextTheme,
        fontSize: context.fontSize,
        setFontSize: context.setFontSize,
    };
}
