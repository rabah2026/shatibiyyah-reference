
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CanonicalData } from '../../shared/canonical.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
        return res.status(400).json({ ok: false, error: 'Query parameter q is required' });
    }

    const results = CanonicalData.search(q);
    return res.status(200).json({ ok: true, data: results });
}
