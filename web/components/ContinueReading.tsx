"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storage } from "@/lib/storage";

export function ContinueReading() {
    const [lastBayt, setLastBayt] = useState<number | null>(null);

    useEffect(() => {
        const id = storage.getLastBayt();
        if (id) setLastBayt(id);
    }, []);

    if (!lastBayt) {
        return (
            <button
                disabled
                className="w-full bg-transparent text-dark-brown border border-dark-brown/30 py-3 px-6 rounded-lg text-lg opacity-50 cursor-not-allowed font-amiri"
            >
                متابعة القراءة (لا يوجد)
            </button>
        );
    }

    return (
        <Link
            href={`/bayt/${lastBayt}`}
            className="w-full block text-center bg-gold/10 text-dark-brown border border-gold hover:bg-gold/20 py-3 px-6 rounded-lg text-lg transition-colors font-amiri"
        >
            تابع القراءة (بيت {lastBayt})
        </Link>
    );
}
