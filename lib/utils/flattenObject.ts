export default function flattenObject(obj: any, prefix = '', res: Record<string, string> = {}) {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const value = obj[key];
        const prefixedKey = prefix ? `${prefix}_${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenObject(value, prefixedKey, res);
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            res[prefixedKey] = String(value);
        }
    }
    return res;
}
