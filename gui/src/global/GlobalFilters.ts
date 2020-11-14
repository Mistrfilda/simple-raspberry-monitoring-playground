const globalFilters = {
    convertMillisecondsTimestampToDateString(timestamp: number): string {
        return (new Date(timestamp)).toDateString();
    },
    calculateBytesToMb(bytes: number): number {
        return bytes / (1024 * 1024);
    },
    calculateBytesToMbString(bytes: number): string {
        return this.calculateBytesToMb(bytes).toFixed(2) + ' MB';
    },
    convertIsoDateStringToFormat(dateString: string): string {
        return this.formatDate(new Date(dateString));
    },
    formatDate(date: Date): string {
        return date.toLocaleString();
        // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
    }
};

export default globalFilters;