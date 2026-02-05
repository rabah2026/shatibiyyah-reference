import Link from "next/link";

export default function MushafLinkPage() {
    return (
        <div className="container mx-auto p-4 flex flex-col min-h-screen items-center justify-center text-center">
            <Link href="/" className="absolute top-4 right-4 text-dark-brown/60 hover:text-dark-brown transition-colors">
                ← عودة
            </Link>

            <h1 className="text-3xl font-bold font-amiri text-dark-brown mb-8">
                ربط المصحف
            </h1>

            <div className="bg-dark-brown/5 rounded-xl p-12 border border-dark-brown/10 max-w-md w-full">
                <p className="text-xl font-amiri mb-4">غير متوفر في البيانات</p>
                <p className="text-sm opacity-50">
                    هذه الخاصية تتطلب ربط الأبيات بالآيات في قاعدة البيانات.
                </p>
            </div>
        </div>
    );
}
