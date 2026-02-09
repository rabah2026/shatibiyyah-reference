import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                parchment: "var(--parchment)",
                "dark-brown": "var(--dark-brown)",
                gold: "var(--gold)",
            },
            fontFamily: {
                amiri: ["var(--font-amiri)"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
