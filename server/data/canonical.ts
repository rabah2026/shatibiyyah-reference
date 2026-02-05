
import baytData from './bayt_text.json';
import metaData from './meta.json';

// Type definitions
interface Bayt {
    id: number;
    number: number;
    text: string;
    chapter: number;
    integrity?: string;
}

interface Meta {
    title: string;
    version: string;
    source: string;
}

// Cast to types
const baytList = baytData as Bayt[];
const metaInfo = metaData as Meta;

export const CanonicalData = {
    getMeta: () => metaInfo,

    getBaytByNumber: (num: number) => {
        return baytList.find(b => b.number === num) || null;
    },

    getRange: (from: number, to: number) => {
        return baytList.filter(b => b.number >= from && b.number <= to);
    },

    search: (query: string) => {
        if (!query.trim()) return [];
        const q = query.trim();
        // Simple inclusion search
        return baytList.filter(b => b.text.includes(q));
    },

    getAll: () => baytList
};
