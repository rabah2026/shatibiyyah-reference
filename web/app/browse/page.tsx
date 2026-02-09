import { DataService } from "@/lib/data";
import SearchableBrowse from "@/components/SearchableBrowse";

export const dynamic = 'force-dynamic';

// Type for the transformed verse data
interface DisplayVerse {
    id: number;
    verseNumber: number;
    text: string;
    chapterId: number;
}

export default async function BrowsePage() {
    // Load all verses server-side for initial render
    let verses: DisplayVerse[] = [];

    try {
        const rawBayts = DataService.getAllBayts();
        verses = rawBayts.map(b => ({
            id: b.id,
            verseNumber: b.number,
            text: b.text,
            chapterId: b.chapter,
        }));
    } catch (e) {
        console.error("Error loading verses:", e);
    }

    // Pass to client component for instant search
    return <SearchableBrowse initialVerses={verses} />;
}
