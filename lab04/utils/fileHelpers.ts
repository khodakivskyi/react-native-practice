export const getNameFromUri = (uri: string) => {
    const parts = uri.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? uri;
};

export const getExtension = (name: string) => {
    const i = name.lastIndexOf('.');
    return i === -1 ? 'folder/unknown' : name.slice(i + 1).toLowerCase();
};

export const formatBytes = (bytes: number) => {
    if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let num = bytes;
    while (num >= 1024 && i < sizes.length - 1) {
        num /= 1024;
        i++;
    }
    return `${num.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
};

export const formatDate = (ms?: number) => {
    if (!ms) return 'Невідомо';
    return new Date(ms).toLocaleString();
};