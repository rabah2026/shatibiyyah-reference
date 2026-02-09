"use client"

import * as React from "react"
import { useTheme } from "@/components/ThemeProvider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full p-2 bg-dark-brown/5 hover:bg-dark-brown/10 text-dark-brown transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Toggle theme"
        >
            <div className="relative h-5 w-5">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-0 left-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
