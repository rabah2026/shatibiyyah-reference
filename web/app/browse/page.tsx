import { api } from "@/lib/api";
import { Verse } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function BrowsePage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || "";
    let verses: Verse[] = [];

    try {
        if (query) {
            verses = await api.searchVerses(query);
        } else {
            verses = await api.getVerses();
        }
    } catch (e) {
        console.error(e);
        // Fallback or error state handled in UI
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl pb-20">
            <header className="mb-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-dark-brown hover:text-gold transition-colors">
                        ← الرئيسية
                    </Link>
                    <h1 className="text-2xl font-bold font-amiri text-dark-brown">
                        {query ? `نتائج البحث: ${query}` : "متن الشاطبية"}
                    </h1>
                    <div className="w-8" />
                </div>

                <form action="/browse" className="relative">
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="بحث في الأبيات..."
                        className="w-full bg-white/50 border border-dark-brown/20 rounded-lg py-2 px-4 focus:outline-none focus:border-gold font-amiri placeholder:text-dark-brown/40"
                    />
                </form>
            </header>

            <div className="space-y-4">
                {verses.length === 0 ? (
                    <div className="text-center py-10 opacity-60 font-amiri">
                        {query ? "لا توجد نتائج" : "جاري تحميل الأبيات..."}
                    </div>
                ) : (
                    verses.map((verse) => (
                        <Link
                            key={verse.id}
                            href={`/bayt/${verse.verseNumber}`}
                            className="block p-4 rounded-lg bg-white/40 hover:bg-white/70 border border-transparent hover:border-gold/30 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start text-xs opacity-40 mb-1 font-sans">
                                <span>#{verse.verseNumber}</span>
                            </div>
                            <p className="text-xl text-center leading-loose font-amiri text-dark-brown">
                                {verse.text}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
