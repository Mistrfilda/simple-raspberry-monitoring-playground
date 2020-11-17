import {LogRecord} from "./LogRecord";
import {LogRecordFile} from "./LogRecordFile";

export interface LogRecordResponse {
    filtered: boolean;
    linesCount: number;
    logRecordFiles: LogRecord[];
    limit?: number;
    offset?: number;
    logRecordFileInfo: LogRecordFile;
}