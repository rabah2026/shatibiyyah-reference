
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'extracted_doc_text.txt');

try {
    // Extracted by PowerShell, very likely UTF-16LE
    const buffer = fs.readFileSync(filePath);
    // Check for BOM
    let text;
    if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        text = buffer.slice(2).toString('utf16le');
    } else {
        text = buffer.toString('utf16le'); // Try anyway
    }

    const lines = text.split(/\r?\n/);
    console.log(`Scanning ${lines.length} lines for 'باب'...`);

    let found = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Check for 'Bab' in Arabic
        if (line.includes('باب') || line.includes('بَاب')) {
            console.log(`[Line ${i}] ${line}`);

            // Print next few lines to see if verse count is there
            for (let j = 1; j <= 3; j++) {
                if (i + j < lines.length) {
                    console.log(`    [+${j}] ${lines[i + j].trim()}`);
                }
            }
            found++;
            if (found > 5) break; // Just need a few examples
        }
    }

    if (found === 0) {
        console.log("No lines found with 'باب'. Encoding might still be wrong or word is missing.");
        // print first few lines for sanity
        for (let k = 0; k < 5; k++) console.log(`[Head ${k}] ${lines[k]}`);
    }

} catch (e) {
    console.error(e);
}
