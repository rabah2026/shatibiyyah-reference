
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CanonicalData } from '../../_lib/canonical';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    const { from, to } = req.query;

    // Range request
    if (from && to) {
        const f = parseInt(from as string);
        const t = parseInt(to as string);
        if (isNaN(f) || isNaN(t)) {
            return res.status(400).json({ ok: false, error: 'Invalid range parameters' });
        }
        const range = CanonicalData.getRange(f, t);
        return res.status(200).json({ ok: true, data: range });
    }

    // Single ID request (via query param if rewrite maps here, or direct /bayt?id=X)
    // For [id].ts style, we usually have a separate file, but this is index handling /bayt query params
    return res.status(400).json({ ok: false, error: 'Missing parameters. Provide ?from=&to=' });
}
