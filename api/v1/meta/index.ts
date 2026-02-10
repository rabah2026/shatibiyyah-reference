
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CanonicalData } from '../../_lib/canonical';

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log("Meta endpoint hit");
    try {
        const meta = CanonicalData.getMeta();
        console.log("Meta retrieved:", meta);
        return res.status(200).json({ ok: true, data: meta });
    } catch (error) {
        console.error("Meta endpoint error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: String(error) });
    }
}
