export interface LogRecord {
    message: string;
    context: string[];
    level: number;
    level_name: string;
    channel: string;
    datetime: string;
    extra: string[]
}