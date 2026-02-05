
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baytPath = path.join(__dirname, 'bayt_text.json');
const metaPath = path.join(__dirname, 'meta.json');
const outPath = path.join(__dirname, 'canonical.ts');

const baytData = JSON.parse(fs.readFileSync(baytPath, 'utf-8'));
const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

const content = `
// Auto-generated inlined data
// Eliminates runtime JSON import issues on Vercel

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

// Inlined Data
const metaInfo: Meta = ${JSON.stringify(metaData, null, 2)};

const baytList: Bayt[] = ${JSON.stringify(baytData)}; 

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
        return baytList.filter(b => b.text.includes(q));
    },

    getAll: () => baytList
};
`;

fs.writeFileSync(outPath, content);
console.log("Generated canonical.ts with inlined data.");
