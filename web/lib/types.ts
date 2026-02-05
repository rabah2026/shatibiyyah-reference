import { z } from "zod";

// --- Domain Models ---

export const ChapterSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    orderIndex: z.number(),
});

export type Chapter = z.infer<typeof ChapterSchema>;

export const VerseSchema = z.object({
    id: z.number(),
    verseNumber: z.number(),
    text: z.string(),
    fullText: z.string().nullable(),
    chapterId: z.number(),
});

export type Verse = z.infer<typeof VerseSchema>;

// Mappings / Metadata (Stubbed for now as they don't exist in DB yet)
export const VerseMappingSchema = z.object({
    baytId: z.number(),
    surahNumber: z.number(),
    ayahNumber: z.number(),
});

export type VerseMapping = z.infer<typeof VerseMappingSchema>;

export const SymbolSchema = z.object({
    symbol: z.string(),
    readerName: z.string(),
});

export type Symbol = z.infer<typeof SymbolSchema>;

// --- API Responses ---

export const VerseListResponseSchema = z.array(VerseSchema);
export const ChapterListResponseSchema = z.array(ChapterSchema);
export const ChapterWithVersesSchema = ChapterSchema.extend({
    verses: z.array(VerseSchema),
});
