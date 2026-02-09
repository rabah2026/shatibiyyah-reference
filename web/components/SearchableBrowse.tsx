'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface DisplayVerse {
    id: number;
    verseNumber: number;
    text: string;
    chapterId: number;
}

interface SearchableBrowseProps {
    initialVerses: DisplayVerse[];
}

/**
 * Remove Arabic diacritics (tashkeel/harakat) from text
 */
function stripArabicDiacritics(text: string): string {
    return text.replace(/[\u064B-\u0652\u0640]/g, '');
}

/**
 * Normalize Arabic text for search
 */
function normalizeArabic(text: string): string {
    let normalized = stripArabicDiacritics(text);
    normalized = normalized.replace(/[أإآ]/g, 'ا');
    normalized = normalized.replace(/ة/g, 'ه');
    return normalized;
}

export default function SearchableBrowse({ initialVerses }: SearchableBrowseProps) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce the query - wait 300ms after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only search if 3+ characters or empty (show all)
            if (query.length >= 3 || query.length === 0) {
                setDebouncedQuery(query);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Filter verses based on debounced query
    const filteredVerses = useMemo(() => {
        if (!debouncedQuery.trim()) {
            return initialVerses;
        }

        const normalizedQuery = normalizeArabic(debouncedQuery.trim());
        return initialVerses.filter(verse => {
            const normalizedText = normalizeArabic(verse.text);
            return normalizedText.includes(normalizedQuery);
        });
    }, [debouncedQuery, initialVerses]);

    const isSearching = query.length > 0 && query.length < 3;

    return (
        <div className="container mx-auto p-4 max-w-2xl pb-20">
            <header className="mb-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-dark-brown hover:text-gold transition-colors">
                        ← الرئيسية
                    </Link>
                    <h1 className="text-2xl font-bold font-amiri text-dark-brown">
                        {debouncedQuery ? `نتائج البحث: ${debouncedQuery}` : "متن الشاطبية"}
                    </h1>
                    <div className="w-8" />
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="بحث في الأبيات... (٣ أحرف على الأقل)"
                        className="w-full bg-white/50 dark:bg-black/20 border border-dark-brown/20 rounded-lg py-2 px-4 focus:outline-none focus:border-gold font-amiri placeholder:text-dark-brown/40"
                    />
                    {isSearching && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-dark-brown/50">
                            اكتب {3 - query.length} أحرف أخرى...
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-4">
                {filteredVerses.length === 0 ? (
                    <div className="text-center py-10 opacity-60 font-amiri">
                        {debouncedQuery ? "لا توجد نتائج" : "لا توجد أبيات"}
                    </div>
                ) : (
                    <>
                        {debouncedQuery && (
                            <div className="text-center text-sm text-dark-brown/60 mb-4">
                                عدد النتائج: {filteredVerses.length}
                            </div>
                        )}
                        {filteredVerses.map((verse) => (
                            <Link
                                key={verse.id}
                                href={`/bayt/${verse.verseNumber}`}
                                className="block p-4 rounded-lg bg-white/40 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10 border border-transparent hover:border-gold/30 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start text-xs opacity-40 mb-1 font-sans">
                                    <span>#{verse.verseNumber}</span>
                                </div>
                                <p className="text-xl text-center leading-loose font-amiri text-dark-brown">
                                    {verse.text}
                                </p>
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
