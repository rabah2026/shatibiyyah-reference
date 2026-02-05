import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const amiri = Amiri({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-amiri",
});

export const metadata: Metadata = {
    title: "Shatibiyyah Companion",
    description: "Digital companion for the Shatibiyyah poem",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={cn(amiri.variable, "font-amiri min-h-screen bg-parchment text-dark-brown")}>
                {children}
            </body>
        </html>
    );
}
