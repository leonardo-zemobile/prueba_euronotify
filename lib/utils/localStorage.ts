class LocalStorageHelper {
    /**
     * Save a single key-value pair to localStorage.
     * @param key The key to save.
     * @param value The value to save (can be any type, converted to JSON).
     */
    static save(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Failed to save ${key} to localStorage:`, error);
        }
    }

    /**
     * Save multiple key-value pairs to localStorage in bulk.
     * @param data An object containing key-value pairs to save.
     */
    static saveBulk(data: Record<string, any>): void {
        try {
            Object.keys(data).forEach((key) => {
                localStorage.setItem(key, JSON.stringify(data[key]));
            });
        } catch (error) {
            console.error('Failed to save bulk data to localStorage:', error);
        }
    }

    /**
     * Retrieve a value from localStorage by its key.
     * @param key The key to retrieve.
     * @returns The parsed value from localStorage, or `null` if not found.
     */
    static get<T = any>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Failed to retrieve ${key} from localStorage:`, error);
            return null;
        }
    }

    /**
     * Retrieve multiple values from localStorage.
     * @param keys An array of keys to retrieve.
     * @returns An object containing the retrieved key-value pairs.
     */
    static getBulk<T = any>(keys: string[]): Record<string, T | null> {
        const result: Record<string, T | null> = {};
        try {
            keys.forEach((key) => {
                const value = localStorage.getItem(key);
                result[key] = value ? JSON.parse(value) : null;
            });
        } catch (error) {
            console.error('Failed to retrieve bulk data from localStorage:', error);
        }
        return result;
    }

    /**
     * Remove a key-value pair from localStorage by its key.
     * @param key The key to remove.
     */
    static remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Failed to remove ${key} from localStorage:`, error);
        }
    }

    /**
     * Clear all key-value pairs from localStorage.
     */
    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
}

export default LocalStorageHelper;
