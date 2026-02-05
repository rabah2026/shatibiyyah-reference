import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Create a test context
function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Shatibiyyah API", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("verses.list", () => {
    it("should return all verses", async () => {
      const verses = await caller.shatibiyyah.verses.list();
      expect(Array.isArray(verses)).toBe(true);
      expect(verses.length).toBeGreaterThan(0);
      expect(verses.length).toBe(1173);
    });

    it("should return verses with correct structure", async () => {
      const verses = await caller.shatibiyyah.verses.list();
      const verse = verses[0];
      expect(verse).toHaveProperty("id");
      expect(verse).toHaveProperty("verseNumber");
      expect(verse).toHaveProperty("text");
      expect(verse).toHaveProperty("chapterId");
    });

    it("should have Arabic text in verses", async () => {
      const verses = await caller.shatibiyyah.verses.list();
      const verse = verses[0];
      expect(verse.text).toBeTruthy();
      expect(verse.text.length).toBeGreaterThan(0);
    });
  });

  describe("verses.byNumber", () => {
    it("should return a verse by number", async () => {
      const verse = await caller.shatibiyyah.verses.byNumber(1);
      expect(verse).toBeDefined();
      expect(verse?.verseNumber).toBe(1);
      expect(verse?.text).toBeTruthy();
    });

    it("should return undefined for non-existent verse", async () => {
      const verse = await caller.shatibiyyah.verses.byNumber(99999);
      expect(verse).toBeUndefined();
    });

    it("should return verse with Arabic text", async () => {
      const verse = await caller.shatibiyyah.verses.byNumber(1);
      expect(verse?.text).toContain("بِسْمِ");
    });
  });

  describe("verses.byId", () => {
    it("should return a verse by ID", async () => {
      const verse = await caller.shatibiyyah.verses.byId(1);
      expect(verse).toBeDefined();
      expect(verse?.id).toBe(1);
    });

    it("should return undefined for non-existent ID", async () => {
      const verse = await caller.shatibiyyah.verses.byId(99999);
      expect(verse).toBeUndefined();
    });
  });

  describe("verses.search", () => {
    it("should accept search queries", async () => {
      const results = await caller.shatibiyyah.verses.search("محمد");
      expect(Array.isArray(results)).toBe(true);
    });

    it("should return empty array for non-matching search", async () => {
      const results = await caller.shatibiyyah.verses.search("zzzzzzzzz");
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it("should return verses with correct structure from search", async () => {
      const results = await caller.shatibiyyah.verses.search("اللهِ");
      if (results.length > 0) {
        const verse = results[0];
        expect(verse).toHaveProperty("id");
        expect(verse).toHaveProperty("verseNumber");
        expect(verse).toHaveProperty("text");
      }
    });
  });

  describe("chapters.list", () => {
    it("should return all chapters", async () => {
      const chapters = await caller.shatibiyyah.chapters.list();
      expect(Array.isArray(chapters)).toBe(true);
      expect(chapters.length).toBeGreaterThan(0);
    });

    it("should return chapters with correct structure", async () => {
      const chapters = await caller.shatibiyyah.chapters.list();
      const chapter = chapters[0];
      expect(chapter).toHaveProperty("id");
      expect(chapter).toHaveProperty("name");
      expect(chapter).toHaveProperty("description");
    });

    it("should have Arabic chapter names", async () => {
      const chapters = await caller.shatibiyyah.chapters.list();
      const chapter = chapters[0];
      expect(chapter.name).toBeTruthy();
      expect(chapter.name).toContain("الشاطبية");
    });
  });

  describe("chapters.byId", () => {
    it("should return a chapter with its verses", async () => {
      const chapter = await caller.shatibiyyah.chapters.byId(1);
      expect(chapter).toBeDefined();
      expect(chapter?.id).toBe(1);
      expect(chapter?.name).toBeTruthy();
      expect(Array.isArray(chapter?.verses)).toBe(true);
    });

    it("should return all verses for the chapter", async () => {
      const chapter = await caller.shatibiyyah.chapters.byId(1);
      expect(chapter?.verses.length).toBe(1173);
    });

    it("should return null for non-existent chapter", async () => {
      const chapter = await caller.shatibiyyah.chapters.byId(99999);
      expect(chapter).toBeNull();
    });
  });

  describe("chapters.verses", () => {
    it("should return verses for a chapter", async () => {
      const verses = await caller.shatibiyyah.chapters.verses(1);
      expect(Array.isArray(verses)).toBe(true);
      expect(verses.length).toBe(1173);
    });

    it("should return empty array for non-existent chapter", async () => {
      const verses = await caller.shatibiyyah.chapters.verses(99999);
      expect(Array.isArray(verses)).toBe(true);
      expect(verses.length).toBe(0);
    });
  });

  describe("Integration Tests", () => {
    it("should have consistent verse numbering", async () => {
      const verses = await caller.shatibiyyah.verses.list();
      for (let i = 0; i < verses.length; i++) {
        expect(verses[i].verseNumber).toBe(i + 1);
      }
    });

    it("should be able to fetch verse by number and by ID", async () => {
      const verseByNumber = await caller.shatibiyyah.verses.byNumber(1);
      const verseById = await caller.shatibiyyah.verses.byId(1);
      expect(verseByNumber?.id).toBe(verseById?.id);
      expect(verseByNumber?.text).toBe(verseById?.text);
    });

    it("should have all verses belong to a chapter", async () => {
      const verses = await caller.shatibiyyah.verses.list();
      verses.forEach((verse) => {
        expect(verse.chapterId).toBeGreaterThan(0);
      });
    });
  });
});
