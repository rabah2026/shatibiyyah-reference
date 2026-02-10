
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CanonicalData } from '../../_lib/canonical';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const meta = CanonicalData.getMeta();
    return res.status(200).json({ ok: true, data: meta });
}
