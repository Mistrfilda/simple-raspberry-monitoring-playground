const globalFilters = {
  convertMillisecondsTimestampToDateString(timestamp: number): string {
    return this.formatDate(new Date(timestamp));
  },
  calculateBytesToMb(bytes: number): number {
    return bytes / (1024 * 1024);
  },
  calculateBytesToMbString(bytes: number): string {
    return this.calculateBytesToMb(bytes).toFixed(2) + " MB";
  },
  convertIsoDateStringToFormat(dateString: string): string {
    return this.formatDate(new Date(dateString));
  },
  formatDate(date: Date): string {
    return date.toLocaleString();
    // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
  },
  truncateText(text: string, length: number): string {
    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + "...";
  }
};

export default globalFilters;
