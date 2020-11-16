import {LogRecord} from "./LogRecord";

export interface LogRecordResponse {
    filtered: boolean;
    linesCount: number;
    logRecordFiles: LogRecord[];
    limit?: number;
    offset?: number;
}