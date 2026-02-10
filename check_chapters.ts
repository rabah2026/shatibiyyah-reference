
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'server/data/bayt_text.json');

try {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    const data = JSON.parse(content);

    const chapters = [];
    console.log("Verse 66:", data.find((b: any) => b.number === 66));
    console.log("First 5 verses:", data.slice(0, 5));

    data.forEach((bayt: any) => {
        if (bayt.text.includes("بَابُ") || bayt.text.includes("باب")) {
            // Heuristic: Chapter titles are usually at the beginning of the line or significant
            console.log(`${bayt.number}: ${bayt.text}`);
        }
    });
    console.log("Total verses:", data.length);
} catch (error) {
    console.error("Error reading file:", error);
}
