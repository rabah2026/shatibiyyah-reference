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

/**
 * Remove Arabic diacritics (tashkeel/harakat) from text
 * This includes: fatha, damma, kasra, sukun, shadda, tanween, etc.
 */
function stripArabicDiacritics(text: string): string {
    // Arabic diacritical marks Unicode range: U+064B to U+0652
    // Also includes tatweel (kashida) U+0640
    return text.replace(/[\u064B-\u0652\u0640]/g, '');
}

/**
 * Normalize Arabic text for search:
 * - Remove diacritics
 * - Normalize alef variants to plain alef
 * - Normalize teh marbuta to heh
 */
function normalizeArabic(text: string): string {
    let normalized = stripArabicDiacritics(text);
    // Normalize alef variants (أ إ آ ا) to plain alef
    normalized = normalized.replace(/[أإآ]/g, 'ا');
    // Normalize teh marbuta (ة) to heh (ه) - optional, common for search
    normalized = normalized.replace(/ة/g, 'ه');
    return normalized;
}

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
        // Normalize query (strip diacritics, normalize letters)
        const normalizedQuery = normalizeArabic(query.trim());
        // Search in normalized verse text
        return (_bayts || []).filter(b => {
            const normalizedText = normalizeArabic(b.text);
            return normalizedText.includes(normalizedQuery);
        });
    },

    getBaytsByChapter: (chapterId: number) => {
        return (_bayts || []).filter(b => b.chapter === chapterId);
    }
};
