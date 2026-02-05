import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllVerses,
  getVerseByNumber,
  getVerseById,
  searchVerses,
  getAllChapters,
  getChapterById,
  getVersesByChapterId,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  shatibiyyah: router({
    verses: router({
      // Get all verses
      list: publicProcedure.query(async () => {
        return getAllVerses();
      }),

      // Get verse by number
      byNumber: publicProcedure
        .input(z.number())
        .query(async ({ input }) => {
          return getVerseByNumber(input);
        }),

      // Get verse by ID
      byId: publicProcedure
        .input(z.number())
        .query(async ({ input }) => {
          return getVerseById(input);
        }),

      // Search verses by text
      search: publicProcedure
        .input(z.string().min(1))
        .query(async ({ input }) => {
          return searchVerses(input);
        }),
    }),

    chapters: router({
      // Get all chapters
      list: publicProcedure.query(async () => {
        return getAllChapters();
      }),

      // Get chapter by ID with its verses
      byId: publicProcedure
        .input(z.number())
        .query(async ({ input }) => {
          const chapter = await getChapterById(input);
          if (!chapter) return null;
          const chapterVerses = await getVersesByChapterId(input);
          return { ...chapter, verses: chapterVerses };
        }),

      // Get verses by chapter ID
      verses: publicProcedure
        .input(z.number())
        .query(async ({ input }) => {
          return getVersesByChapterId(input);
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
