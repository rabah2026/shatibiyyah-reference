
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'extracted_doc_text.txt');
const outputPath = path.join(process.cwd(), 'web', 'data', 'chapters.ts');

try {
    // Diagnosed as UTF-8. Split by any newline combo.
    const buffer = fs.readFileSync(filePath);
    let text = buffer.toString('utf8').replace(/^\uFEFF/, '');

    // Debug: Check newlines
    console.log("Newline check:", text.indexOf('\r'), text.indexOf('\n'));

    // Check for weird newlines
    console.log("Newline check:", text.indexOf('\r'), text.indexOf('\n'));

    // Global regex search on the WHOLE text might be better if newlines are weird
    const globalMatches = [];
    // Regex: Look for Arabic words then (digits)
    // Be lenient.
    const chapterRegex = /([\u0600-\u06FF\s]+?)\s*\((\d+)\)/g;

    let match;
    while ((match = chapterRegex.exec(text)) !== null) {
        const title = match[1].trim();
        const count = parseInt(match[2], 10);
        const index = match.index;

        // Filter noise
        if (title.length < 3 || title.length > 50) continue; // Title too long/short? 
        if (title.includes('الصفحة')) continue;
        // Check if title is just a few words
        // "Book ..."

        // Only accept if title does NOT contain digits (verses)
        if (title.match(/\d/)) continue;

        globalMatches.push({ title, count, index });
    }

    console.log(`Found ${globalMatches.length} global matches.`);
    if (globalMatches.length > 0) {
        console.log("First 5 matches:", globalMatches.slice(0, 5));
    }

    // Logic to map matches to existing structure or just use them
    const chapters = globalMatches.map((m, i) => ({
        id: i + 1,
        name: m.title.replace(/[\*\-\=\:]/g, '').trim(),
        count: m.count,
        startv: 0 // calculate
    }));


    console.log(`Found ${chapters.length} raw chapters.`);

    // Calculate start/end
    let runningStart = 1;
    const finalChapters = chapters.map(ch => {
        const c = {
            id: ch.id,
            name: ch.name,
            start: runningStart,
            end: runningStart + ch.count - 1
        };
        runningStart += ch.count;
        return c;
    });

    console.log(JSON.stringify(finalChapters, null, 2));

    const tsContent = `export const chapters = ${JSON.stringify(finalChapters, null, 2)};`;
    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    console.log(`Saved to ${outputPath}`);

} catch (e) {
    console.error(e);
}
