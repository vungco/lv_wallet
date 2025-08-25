// storage.ts

type StorageValue = string | number | boolean | object | null;

const storage = {
    get: (keys: string | string[]): Promise<Record<string, any>> => {
        return new Promise((resolve, reject) => {
            try {
                if (chrome.storage.local) {
                    chrome.storage.local.get(keys, (result) => {
                        resolve(result);
                    });
                } else {
                    resolve({});
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    set: (items: Record<string, any>): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                if (chrome.storage.local) {
                    chrome.storage.local.set(items, () => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    remove: (keys: string | string[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                if (chrome.storage.local) {
                    chrome.storage.local.remove(keys, () => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    },
};


// Lấy dữ liệu từ Storage
export const getFromStorage = async <T = StorageValue>(key: string): Promise<T | null> => {
    try {
        if (chrome?.storage?.local) {
            const result = await storage.get(key);
            return result[key] as T;
        } else {
            const storedValue = localStorage.getItem(key);
            return storedValue ? (JSON.parse(storedValue) as T) : null;
        }
    } catch (err) {
        console.error("getFromStorage error:", err);
        return null;
    }
};

// Lưu dữ liệu vào Storage
export const saveToStorage = async <T = StorageValue>(key: string, value: T): Promise<void> => {
    try {
        if (chrome.storage.local) {
            await storage.set({ [key]: value });
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
        console.log(`Saved ${key}:`, value);
    } catch (err) {
        console.error("saveToStorage error:", err);
    }
};

// Xóa dữ liệu khỏi Storage
export const removeFromStorage = async (key: string): Promise<void> => {
    try {
        if (chrome?.storage?.local) {
            await storage.remove(key);
        } else {
            localStorage.removeItem(key);
        }
        console.log(`Removed ${key}`);
    } catch (err) {
        console.error("removeFromStorage error:", err);
    }
};
