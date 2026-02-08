// Data service using direct JSON imports (Vercel compatible)
// The JSON is bundled at build time, no fs operations at runtime

import baytData from '../data/bayt_text.json';
import metaData from '../data/meta.json';

export interface Bayt {
    id: number;
    number: number;
    text: string;
    chapter: number;
    integrity?: string;
}

export interface Meta {
    title: string;
    description?: string;
    version: string;
    source: string;
    generated_at?: string;
}

const _bayts: Bayt[] = baytData as Bayt[];
const _meta: Meta = metaData as Meta;

export const DataService = {
    getMeta: () => {
        return _meta;
    },

    getAllBayts: () => {
        return _bayts || [];
    },

    getBaytByNumber: (num: number) => {
        return _bayts?.find(b => b.number === num) || null;
    },

    search: (query: string) => {
        if (!query.trim()) return [];
        const q = query.trim();
        // Simple inclusion search
        return (_bayts || []).filter(b => b.text.includes(q));
    },

    getBaytsByChapter: (chapterId: number) => {
        return (_bayts || []).filter(b => b.chapter === chapterId);
    }
};
