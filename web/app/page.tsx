import Link from "next/link";
import { ContinueReading } from "@/components/ContinueReading";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center space-y-8 bg-background text-foreground">
            <h1 className="text-5xl font-bold font-amiri text-dark-brown drop-shadow-sm mb-4">
                متن الشاطبية
            </h1>
            <p className="text-xl text-dark-brown/80 max-w-md font-amiri leading-relaxed opacity-80">
                حرز الأماني ووجه التهاني في القراءات السبع
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs z-10">
                <ContinueReading />

                <Link
                    href="/browse"
                    className="bg-dark-brown text-parchment py-3 px-6 rounded-lg text-lg hover:bg-dark-brown/90 transition-colors shadow-md border border-gold font-amiri block"
                >
                    تصفح المتن
                </Link>

                <Link
                    href="/chapters"
                    className="bg-white/80 text-dark-brown border border-dark-brown/20 py-3 px-6 rounded-lg text-lg hover:bg-white transition-colors font-amiri block shadow-sm"
                >
                    فهرس الأبواب
                </Link>

                <div className="flex gap-2 w-full">
                    <Link
                        href="/mushaf-link"
                        className="flex-1 bg-white/50 text-dark-brown border border-dark-brown/20 py-2 px-2 rounded-lg text-base hover:bg-white/80 transition-colors font-amiri"
                    >
                        ربط المصحف
                    </Link>
                    <Link
                        href="/symbols"
                        className="flex-1 bg-white/50 text-dark-brown border border-dark-brown/20 py-2 px-2 rounded-lg text-base hover:bg-white/80 transition-colors font-amiri"
                    >
                        الرموز
                    </Link>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
            <footer className="absolute bottom-4 text-sm opacity-40 font-sans">
                الإصدار 0.1 (MVP)
            </footer>
        </main>
    );
}
