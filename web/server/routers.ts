
import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { DataService } from '@/lib/data';

// Schemas
const BaytSchema = z.object({
    id: z.number(),
    verseNumber: z.number(),
    text: z.string(),
    fullText: z.string().nullable(),
    chapterId: z.number(),
    createdAt: z.string().optional() // Simulate date string
});

const ChapterSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    orderIndex: z.number(),
});

// Since our JSON data doesn't have chapters, we'll mock them for now based on the original API contract
// Or just serve a single default chapter if data is missing.
const DEFAULT_CHAPTER = {
    id: 1,
    name: "متن الشاطبية",
    description: "حرز الأماني ووجه التهاني في القراءات السبع",
    orderIndex: 0,
};

export const appRouter = router({
    shatibiyyah: router({
        verses: router({
            list: publicProcedure.query(() => {
                const bayts = DataService.getAllBayts();
                return bayts.map(b => ({
                    id: b.id,
                    verseNumber: b.number,
                    text: b.text,
                    fullText: b.text,
                    chapterId: b.chapter,
                    createdAt: new Date().toISOString()
                }));
            }),

            byNumber: publicProcedure
                .input(z.number())
                .query(({ input }) => {
                    const b = DataService.getBaytByNumber(input);
                    if (!b) return null;
                    return {
                        id: b.id,
                        verseNumber: b.number,
                        text: b.text,
                        fullText: b.text,
                        chapterId: b.chapter,
                        createdAt: new Date().toISOString()
                    };
                }),

            search: publicProcedure
                .input(z.string())
                .query(({ input }) => {
                    const bayts = DataService.search(input);
                    return bayts.map(b => ({
                        id: b.id,
                        verseNumber: b.number,
                        text: b.text,
                        fullText: b.text,
                        chapterId: b.chapter,
                        createdAt: new Date().toISOString()
                    }));
                }),
        }),

        chapters: router({
            list: publicProcedure.query(() => {
                return [DEFAULT_CHAPTER];
            })
        })
    }),
});

export type AppRouter = typeof appRouter;
