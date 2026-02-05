export const STORAGE_KEYS = {
    LAST_BAYT: "shatibiyyah_last_bayt",
    FONT_SIZE: "shatibiyyah_font_size",
    THEME: "shatibiyyah_theme",
} as const;

export const storage = {
    get: (key: string) => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(key);
    },
    set: (key: string, value: string) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, value);
    },
    getLastBayt: () => {
        const val = storage.get(STORAGE_KEYS.LAST_BAYT);
        return val ? parseInt(val, 10) : null;
    },
    setLastBayt: (id: number) => {
        storage.set(STORAGE_KEYS.LAST_BAYT, id.toString());
    },
};
