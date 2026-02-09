import { VerseListResponseSchema, VerseSchema, ChapterListResponseSchema, ChapterWithVersesSchema } from "./types";
import { z } from "zod";


function getBaseUrl() {
    // Browser: use relative URLs
    if (typeof window !== "undefined") {
        return "";
    }

    // Vercel deployment
    if (process.env.VERCEL_URL) {
        // VERCEL_URL doesn't include protocol
        return `https://${process.env.VERCEL_URL}`;
    }

    // Explicit API URL (fallback)
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }

    // Local development
    return "http://localhost:3000";
}

async function fetchTRPC<T>(endpoint: string, schema: z.ZodType<T>, input?: any): Promise<T> {
    const baseUrl = getBaseUrl();

    // Build URL properly based on environment
    let urlString = `${baseUrl}/api/trpc/${endpoint}`;

    // tRPC HTTP spec: input parameter should be JSON stringified
    if (input !== undefined) {
        const encodedInput = encodeURIComponent(JSON.stringify(input));
        urlString += `?input=${encodedInput}`;
    }

    console.log('[API] Fetching:', urlString);

    const res = await fetch(urlString, {
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
