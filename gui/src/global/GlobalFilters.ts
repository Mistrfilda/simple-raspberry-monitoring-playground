const globalFilters = {
    convertMillisecondsTimestampToDateString(timestamp: number): string {
        return (new Date(timestamp)).toDateString();
    },
    calculateBytesToMb(bytes: number): number {
        return bytes / (1024 * 1024);
    },
    calculateBytesToMbString(bytes: number): string {
        return this.calculateBytesToMb(bytes).toFixed(2) + ' MB';
    }
};

export default globalFilters;