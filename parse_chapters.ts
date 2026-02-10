
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'extracted_doc_text.txt');
const outputPath = path.join(process.cwd(), 'chapters_final.json');

try {
    const text = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');

    // Debug: Check first chars
    console.log("First chars codes:", text.charCodeAt(0), text.charCodeAt(1), text.charCodeAt(2), text.charCodeAt(3));
    console.log("First 100 chars:", text.substring(0, 100));

    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    console.log(`Read ${lines.length} non-empty lines.`);

    // Debug: Check first 5 lines
    for (let k = 0; k < Math.min(5, lines.length); k++) {
        console.log(`Line ${k}: [${lines[k]}]`);
    }

    const chapters = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for Chapter Title Candidate
        // Must contain (digits) at the end, OR be "Introduction"
        // And distinct from verse lines which start with digits

        if (line.match(/^\d+\s*-/)) {
            continue; // Verse line
        }

        // Candidate: has (N) at the end, or is "Bab..." 
        // In the file: "بَابُ الاسْتِعَاذَةِ (5)"
        const titleMatch = line.match(/(.+?)\s*\((\d+)\)$/);

        if (titleMatch) {
            let title = titleMatch[1].trim();
            // Clean content
            title = title.replace(/\* \* \*/g, '').replace(/^[-:=]+/, '').trim();

            // Allow if starts with Bab, Surah, Introduction, or contains "Fasl" (Section)?
            // Or just trust the (N) format? 
            // The file seems consistent with (N).

            // Check for Arabic content
            if (!title.match(/[\u0600-\u06FF]/)) continue;

            // Find start verse
            let startVerse = null;
            for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
                const verseMatch = lines[j].match(/^(\d+)\s*-/);
                if (verseMatch) {
                    startVerse = parseInt(verseMatch[1], 10);
                    break;
                }
            }

            if (startVerse !== null) {
                chapters.push({
                    id: 0, // Fill later
                    name: title.replace(/[\(\)]/g, '').trim(),
                    start: startVerse,
                    end: 0, // Fill later
                });
            }
        }
    }

    // Dedup chapters by start verse (keep first occurrence)
    // Sometimes headers are repeated or split?
    const uniqueChapters = [];
    const seenStarts = new Set();

    for (const ch of chapters) {
        if (!seenStarts.has(ch.start)) {
            seenStarts.add(ch.start);
            uniqueChapters.push(ch);
        }
    }

    // Sort
    uniqueChapters.sort((a, b) => a.start - b.start);

    // Fix Ends and IDs
    for (let i = 0; i < uniqueChapters.length; i++) {
        uniqueChapters[i].id = i + 1;
        if (i < uniqueChapters.length - 1) {
            uniqueChapters[i].end = uniqueChapters[i + 1].start - 1;
        } else {
            uniqueChapters[i].end = 1173; // Hardcoded known end
        }
    }

    fs.writeFileSync(outputPath, JSON.stringify(uniqueChapters, null, 2), 'utf-8');
    console.log(`Wrote ${uniqueChapters.length} chapters to ${outputPath}`);
} catch (e) {
    console.error(e);
}
