import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, chapters, verses, InsertVerse, InsertChapter } from "../drizzle/schema";
import { ENV } from './_core/env';
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Fallback (no DB) mode
// - If DATABASE_URL is not configured, the API will serve data from verses.json
// - This enables simple deployments (e.g. frontend on Vercel + API anywhere)
// ---------------------------------------------------------------------------

type FallbackVerse = {
  id: number;
  verseNumber: number;
  text: string;
  fullText: string;
  chapterId: number;
  createdAt: Date;
};

type FallbackChapter = {
  id: number;
  name: string;
  description: string;
  orderIndex: number;
  createdAt: Date;
};

let _fallbackVerses: FallbackVerse[] | null = null;
let _fallbackChapters: FallbackChapter[] | null = null;

function ensureFallbackLoaded() {
  if (_fallbackVerses && _fallbackChapters) return;

  // Read verses.json from project root
  const versesPath = path.join(process.cwd(), "verses.json");
  const raw = JSON.parse(fs.readFileSync(versesPath, "utf-8")) as Array<{
    id: number;
    number: number;
    text: string;
    chapter: number;
  }>;

  _fallbackVerses = raw
    .map(v => ({
      id: v.id,
      verseNumber: v.number,
      text: v.text,
      fullText: v.text,
      chapterId: v.chapter ?? 1,
      createdAt: new Date(0),
    }))
    .sort((a, b) => a.verseNumber - b.verseNumber);

  _fallbackChapters = [
    {
      id: 1,
      name: "متن الشاطبية",
      description: "حرز الأماني ووجه التهاني في القراءات السبع",
      orderIndex: 0,
      createdAt: new Date(0),
    },
  ];
}

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all chapters
 */
export async function getAllChapters() {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return _fallbackChapters ?? [];
  }
  return db.select().from(chapters).orderBy(chapters.orderIndex);
}

/**
 * Get chapter by ID
 */
export async function getChapterById(id: number) {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return (_fallbackChapters ?? []).find(c => c.id === id);
  }
  const result = await db.select().from(chapters).where(eq(chapters.id, id)).limit(1);
  return result[0];
}

/**
 * Get all verses
 */
export async function getAllVerses() {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return _fallbackVerses ?? [];
  }
  return db.select().from(verses).orderBy(verses.verseNumber);
}

/**
 * Get verse by ID
 */
export async function getVerseById(id: number) {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return (_fallbackVerses ?? []).find(v => v.id === id);
  }
  const result = await db.select().from(verses).where(eq(verses.id, id)).limit(1);
  return result[0];
}

/**
 * Get verse by verse number
 */
export async function getVerseByNumber(verseNumber: number) {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return (_fallbackVerses ?? []).find(v => v.verseNumber === verseNumber);
  }
  const result = await db.select().from(verses).where(eq(verses.verseNumber, verseNumber)).limit(1);
  return result[0];
}

/**
 * Get verses by chapter ID
 */
export async function getVersesByChapterId(chapterId: number) {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    return (_fallbackVerses ?? [])
      .filter(v => v.chapterId === chapterId)
      .sort((a, b) => a.verseNumber - b.verseNumber);
  }
  return db.select().from(verses).where(eq(verses.chapterId, chapterId)).orderBy(verses.verseNumber);
}

/**
 * Search verses by text (Arabic search)
 */
export async function searchVerses(query: string) {
  const db = await getDb();
  if (!db) {
    ensureFallbackLoaded();
    const q = (query ?? "").trim();
    if (!q) return [];
    return (_fallbackVerses ?? [])
      .filter(v => v.text.includes(q) || v.fullText.includes(q))
      .sort((a, b) => a.verseNumber - b.verseNumber);
  }
  // Use LIKE for Arabic text search
  const pattern = `%${query}%`;
  return db.select().from(verses).where(
    sql`${verses.text} LIKE ${pattern}`
  ).orderBy(verses.verseNumber);
}

/**
 * Insert a chapter
 */
export async function insertChapter(chapter: InsertChapter) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(chapters).values(chapter);
  return result;
}

/**
 * Insert verses
 */
export async function insertVerses(versesList: InsertVerse[]) {
  const db = await getDb();
  if (!db) return undefined;
  return db.insert(verses).values(versesList);
}


