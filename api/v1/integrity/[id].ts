
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';
import { CanonicalData } from '../../shared/canonical.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ ok: false, error: 'ID required' });
    }

    const num = parseInt(id as string);
    const bayt = CanonicalData.getBaytByNumber(num);

    if (!bayt) {
        return res.status(404).json({ ok: false, error: 'Bayt not found' });
    }

    // Calculate SHA256 of the text
    const hash = createHash('sha256').update(bayt.text).digest('hex');

    return res.status(200).json({ ok: true, data: { number: num, sha256: hash } });
}
