
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'extracted_doc_text.txt');

try {
    const buffer = fs.readFileSync(filePath);
    console.log("File size:", buffer.length);
    console.log("First 4 bytes:", buffer[0], buffer[1], buffer[2], buffer[3]);

    const strUtf16 = buffer.toString('utf16le');
    console.log("UTF-16LE head:", strUtf16.substring(0, 100).replace(/\r/g, '\\r').replace(/\n/g, '\\n'));

    const strUtf8 = buffer.toString('utf8');
    console.log("UTF-8 head:", strUtf8.substring(0, 100).replace(/\r/g, '\\r').replace(/\n/g, '\\n'));

} catch (e) {
    console.error(e);
}
