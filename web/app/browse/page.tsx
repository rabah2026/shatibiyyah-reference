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

interface BrowsePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
    // Load verses server-side
    let verses: DisplayVerse[] = [];
    let titleOverride: string | undefined;

    try {
        const params = await searchParams;
        const chapterId = params?.chapterId ? parseInt(params.chapterId as string) : undefined;

        let rawBayts;
        if (chapterId) {
            rawBayts = DataService.getBaytsByChapterId(chapterId);
            const chapter = DataService.getChapterById(chapterId);
            if (chapter) {
                titleOverride = chapter.name;
            }
        } else {
            rawBayts = DataService.getAllBayts();
        }

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
    return <SearchableBrowse initialVerses={verses} titleOverride={titleOverride} />;
}

