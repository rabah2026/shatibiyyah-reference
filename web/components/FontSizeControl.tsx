"use client";

import { useTheme } from "@/components/ThemeProvider";

export function FontSizeControl() {
    const { fontSize, setFontSize } = useTheme();

    return (
        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 rounded-lg p-1 border border-dark-brown/10 dark:border-white/10">
            <button
                onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                className="px-2 py-1 hover:bg-gold/20 rounded text-sm font-bold"
                aria-label="Decrease font size"
            >
                A-
            </button>
            <span className="text-xs w-6 text-center">{fontSize}</span>
            <button
                onClick={() => setFontSize(Math.min(48, fontSize + 2))}
                className="px-2 py-1 hover:bg-gold/20 rounded text-sm font-bold"
                aria-label="Increase font size"
            >
                A+
            </button>
        </div>
    );
}
