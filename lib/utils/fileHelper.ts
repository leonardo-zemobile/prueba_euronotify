export const formatBytesToGB = (bytes: number): string => {
    const GB = bytes / (1024 * 1024 * 1024);
    return GB.toFixed(2) + ' GB'; // Keep two decimal places
};