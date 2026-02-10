
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'extracted_doc_text.txt');

try {
    const buffer = fs.readFileSync(filePath);
    // Read last 50KB
    const start = Math.max(0, buffer.length - 50000);
    const endBuffer = buffer.slice(start);
    const text = endBuffer.toString('utf8');

    // Dump around Makharij (23912)
    // Expand range to find previous verses
    const mstart = 23912;
    console.log("--- Around Makharij Context ---");
    // Go back 500 chars to find previous verse
    console.log(text.substring(mstart - 500, mstart + 500).replace(/\r/g, '\n'));

    // Dump around Khtaimeh (26625)
    const kstart = 26625;
    console.log("--- Around Khatimah ---");
    console.log(text.substring(kstart - 50, kstart + 400).replace(/\r/g, '\n'));


} catch (e) {
    console.error(e);
}
