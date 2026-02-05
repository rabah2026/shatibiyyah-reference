import { VerseListResponseSchema, VerseSchema, ChapterListResponseSchema, ChapterWithVersesSchema } from "./types";
import { z } from "zod";


function getBaseUrl() {
    if (typeof window !== "undefined") return ""; // Browser: use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel SSR
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return "http://localhost:3000"; // Local dev SSR
}

const API_BASE_URL = getBaseUrl();

async function fetchTRPC<T>(endpoint: string, schema: z.ZodType<T>, input?: any): Promise<T> {
    const url = new URL(`${API_BASE_URL}/api/trpc/${endpoint}`, "http://localhost:3000"); // Base needed for relative URLs in Node

    // tRPC HTTP spec: input parameter should be JSON stringified
    if (input !== undefined) {
        url.searchParams.append("input", JSON.stringify(input));
    }

    const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`API Error ${res.status}:`, errorText);
        throw new Error(`Failed to fetch from ${endpoint}: ${res.status}`);
    }

    const json = await res.json();

    // tRPC response can be wrapped in { result: { data: ... } } or direct array
    // Try wrapped format first
    if (json.result && json.result.data !== undefined) {
        const parsed = schema.safeParse(json.result.data);
        if (parsed.success) return parsed.data;
        console.error("Zod Validation Failed (wrapped):", parsed.error);
        throw new Error("Invalid API Response (wrapped format)");
    }

    // Try direct format
    const parsed = schema.safeParse(json);
    if (parsed.success) return parsed.data;

    console.error("Zod Validation Failed:", parsed.error, "Response:", json);
    throw new Error("Invalid API Response");
}

export const api = {
    getVerses: () => fetchTRPC("shatibiyyah.verses.list", VerseListResponseSchema),

    getVerseByNumber: (number: number) =>
        fetchTRPC("shatibiyyah.verses.byNumber", VerseSchema, number),

    searchVerses: (query: string) =>
        fetchTRPC("shatibiyyah.verses.search", VerseListResponseSchema, query),

    getChapters: () => fetchTRPC("shatibiyyah.chapters.list", ChapterListResponseSchema),

    getChapterById: (id: number) =>
        fetchTRPC("shatibiyyah.chapters.byId", ChapterWithVersesSchema, id),
};
