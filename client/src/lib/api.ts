
export const API_BASE = '/api/v1';

export async function fetchMeta() {
    const res = await fetch(`${API_BASE}/meta`);
    return res.json();
}

export async function fetchBayt(id: number) {
    const res = await fetch(`${API_BASE}/bayt/${id}`);
    return res.json();
}

export async function fetchRange(from: number, to: number) {
    const res = await fetch(`${API_BASE}/bayt?from=${from}&to=${to}`);
    return res.json();
}

export async function search(q: string) {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
    return res.json();
}

export async function checkIntegrity(id: number) {
    const res = await fetch(`${API_BASE}/integrity/bayt/${id}`);
    return res.json();
}
