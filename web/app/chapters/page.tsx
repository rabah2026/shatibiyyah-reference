
import Link from 'next/link';
import { DataService } from '@/lib/data';

export default function ChaptersPage() {
    const chapters = DataService.getChapters();

    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <header className="mb-8 flex items-center justify-between">
                <Link href="/" className="text-dark-brown hover:text-gold transition-colors font-amiri text-lg">
                    ← الرئيسية
                </Link>
                <h1 className="text-3xl font-bold text-center text-dark-brown font-amiri">
                    فهرس الأبواب
                </h1>
                <div className="w-16"></div> {/* Spacer for centering */}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((chapter) => (
                    <Link
                        key={chapter.id}
                        href={`/browse?chapterId=${chapter.id}`}
                        className="group block p-4 bg-white/40 dark:bg-white/5 border border-dark-brown/10 hover:border-gold/50 rounded-lg transition-all hover:bg-white/60 dark:hover:bg-white/10 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-2 text-xs text-dark-brown/40 font-mono">
                            <span>#{chapter.id}</span>
                            <span className="bg-dark-brown/5 px-2 py-0.5 rounded-full group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                                {chapter.end - chapter.start + 1} بيت
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-dark-brown group-hover:text-gold transition-colors font-amiri mb-3 leading-relaxed">
                            {chapter.name}
                        </h2>
                        <div className="flex justify-between text-xs text-dark-brown/50 border-t border-dark-brown/5 pt-2 mt-auto font-mono">
                            <span>من: {chapter.start}</span>
                            <span>إلى: {chapter.end}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
