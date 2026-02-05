import type { Config } from "tailwindcss";

const config: Config = {
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
                parchment: "#fcf6e5",
                "dark-brown": "#3e2723",
                gold: "#c5a059",
            },
            fontFamily: {
                amiri: ["var(--font-amiri)"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
