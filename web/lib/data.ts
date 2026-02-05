
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface Bayt {
    id: number;
    number: number;
    text: string;
    chapter: number;
    integrity?: string;
}

export interface Meta {
    title: string;
    version: string;
    source: string;
}

let _bayts: Bayt[] | null = null;
let _meta: Meta | null = null;

function loadData() {
    if (_bayts && _meta) return;

    try {
        const baytPath = path.join(DATA_DIR, 'bayt_text.json');
        const metaPath = path.join(DATA_DIR, 'meta.json');

        _bayts = JSON.parse(fs.readFileSync(baytPath, 'utf-8'));
        _meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (error) {
        console.error("Failed to load data:", error);
        _bayts = [];
    }
}

export const DataService = {
    getMeta: () => {
        loadData();
        return _meta;
    },

    getAllBayts: () => {
        loadData();
        return _bayts || [];
    },

    getBaytByNumber: (num: number) => {
        loadData();
        return _bayts?.find(b => b.number === num) || null;
    },

    search: (query: string) => {
        loadData();
        if (!query.trim()) return [];
        const q = query.trim();
        // Simple inclusion search
        return (_bayts || []).filter(b => b.text.includes(q));
    },

    getBaytsByChapter: (chapterId: number) => {
        loadData();
        return (_bayts || []).filter(b => b.chapter === chapterId);
    }
};
