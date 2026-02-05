import { api } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: { id: string };
}

export default async function BaytPage({ params }: PageProps) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    let verse;
    try {
        verse = await api.getVerseByNumber(id);
    } catch (e) {
        console.error(e);
    }

    if (!verse) notFound();

    // Navigation
    const prevId = id > 1 ? id - 1 : null;
    const nextId = id < 1173 ? id + 1 : null;

    return (
        <div className="container mx-auto p-4 flex flex-col min-h-screen items-center justify-center max-w-3xl">
            <Link href="/browse" className="absolute top-4 right-4 text-dark-brown/60 hover:text-dark-brown transition-colors">
                ✕ إغلاق
            </Link>

            <div className="w-full mb-8 text-center">
                <span className="text-sm border border-dark-brown/20 rounded-full px-3 py-1 opacity-50">
                    بيت {verse.verseNumber}
                </span>
            </div>

            <div className="text-3xl md:text-4xl text-center leading-[2.5] font-amiri text-dark-brown mb-12 drop-shadow-sm w-full px-4">
                {verse.text}
            </div>

            {/* Linked Verses / Metadata Stub */}
            <div className="w-full bg-dark-brown/5 rounded-xl p-6 mb-12 border border-dark-brown/10">
                <h3 className="text-sm opacity-60 mb-2 font-bold">الآيات المرتبطة</h3>
                <p className="text-dark-brown/40 text-sm">غير متوفر في البيانات</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8 text-lg font-amiri">
                {nextId ? (
                    <Link href={`/bayt/${nextId}`} className="hover:text-gold transition-colors">
                        البيت التالي ←
                    </Link>
                ) : <span className="opacity-30">البيت التالي ←</span>}

                {prevId ? (
                    <Link href={`/bayt/${prevId}`} className="hover:text-gold transition-colors">
                        → البيت السابق
                    </Link>
                ) : <span className="opacity-30">→ البيت السابق</span>}
            </div>
        </div>
    );
}
