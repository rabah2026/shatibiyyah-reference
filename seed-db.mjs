import { drizzle } from 'drizzle-orm/mysql2';
import { chapters, verses } from './drizzle/schema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize database connection
const db = drizzle(process.env.DATABASE_URL);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Read verses from JSON file
    const versesPath = path.join(__dirname, 'verses.json');
    const versesData = JSON.parse(fs.readFileSync(versesPath, 'utf-8'));

    console.log(`📖 Found ${versesData.length} verses to seed`);

    // Insert default chapter
    const defaultChapter = {
      name: 'متن الشاطبية',
      description: 'حرز الأماني ووجه التهاني في القراءات السبع',
      orderIndex: 0,
    };

    console.log('📚 Inserting default chapter...');
    const chapterResult = await db.insert(chapters).values(defaultChapter);
    const chapterId = chapterResult[0];

    console.log(`✓ Chapter inserted with ID: ${chapterId}`);

    // Prepare verses for insertion
    const versesToInsert = versesData.map((v) => ({
      verseNumber: v.number,
      text: v.text,
      fullText: v.text,
      chapterId: 1, // Use the inserted chapter ID
    }));

    // Insert verses in batches
    const batchSize = 100;
    for (let i = 0; i < versesToInsert.length; i += batchSize) {
      const batch = versesToInsert.slice(i, i + batchSize);
      await db.insert(verses).values(batch);
      console.log(`✓ Inserted verses ${i + 1} to ${Math.min(i + batchSize, versesToInsert.length)}`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Total verses inserted: ${versesToInsert.length}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
