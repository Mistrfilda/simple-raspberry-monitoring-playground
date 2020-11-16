import path from 'path';
import fs from 'fs';
import {logLevel} from './LogLevel'
import {LogRecord} from "./LogRecord";
import {LogRecordFile} from "./LogRecordFile";
import {LogRecordResponse} from "./LogRecordResponse";

const md5 = require('md5');

export default class logReader {

    public getList(folder: string): string[] {
        return fs.readdirSync(folder);
    }

    public getFilenameFromHash(folder: string, hash: string): string {
        const files = this.getList(folder);

        for (let i = 0; i < files.length; i++) {
            if (md5(files[i]) === hash) {
                return files[i];
            }
        }

        throw new Error('File not found');
    }

    public getFullList(folder: string): LogRecordFile[] {
        let results: LogRecordFile[] = [];
        const files = this.getList(folder);
        files.forEach(function (value: string) {
            const fileStats = fs.statSync(path.join(folder, value));
            results.push({
                id: md5(value),
                name: value,
                fileSize: fileStats.size,
                lastUpdatedAtTimestamp: fileStats.atimeMs,
            });
        })

        return results;
    }

    public readFile(folder: string, file: string, offset: number | null = null, limit: number | null = null): LogRecordResponse {
        const fileContents = fs.readFileSync(path.join(folder, file), 'utf-8');

        let logRecordFiles = fileContents.split("\n").filter((line: string) => {
            return line !== '';
        }).map((line: string) => {
            return JSON.parse(line);
        });

        let linesCount = logRecordFiles.length;

        if (offset !== null && limit !== null) {
            logRecordFiles = logRecordFiles.slice(offset, offset + limit);
        }

        return {
            filtered: false,
            linesCount: linesCount,
            logRecordFiles: logRecordFiles,
            limit: limit,
            offset: offset
        }
    }

    public readAndParseLogLevel(folder: string, file: string, requestLogLevel: string, offset?: number, limit?: number): LogRecordResponse {
        const parsedFile = this.readFile(folder, file).logRecordFiles;
        let filteredParts: LogRecord[] = [];

        if (!(requestLogLevel in logLevel)) {
            throw new Error('no no no');
        }

        for (let i = 0; i < parsedFile.length; i++) {
            if (parsedFile[i].level_name === requestLogLevel.toUpperCase()) {
                filteredParts.push(parsedFile[i]);
            }
        }

        let linesCount = filteredParts.length;

        if (offset !== null && limit !== null) {
            filteredParts = filteredParts.slice(offset, offset + limit);
        }

        return {
            filtered: false,
            linesCount: linesCount,
            logRecordFiles: filteredParts,
            limit: limit,
            offset: offset
        }
    }

    public readAndParseMultipleLogLevels(folder: string, file: string, requestLogLevels: string[], offset?: number, limit?: number): LogRecordResponse {
        const parsedFile = this.readFile(folder, file).logRecordFiles;

        for (let i = 0; i < requestLogLevels.length; i++) {
            if (!(requestLogLevels[i] in logLevel)) {
                throw new Error('Invalid request log level');
            }

            requestLogLevels[i] = requestLogLevels[i].toUpperCase();
        }

        let filteredParts: LogRecord[] = this.filterMultipleLevels(parsedFile, requestLogLevels);


        let linesCount = filteredParts.length;

        if (offset !== null && limit !== null) {
            filteredParts = filteredParts.slice(offset, offset + limit);
        }

        return {
            filtered: false,
            linesCount: linesCount,
            logRecordFiles: filteredParts,
            limit: limit,
            offset: offset
        }
    }

    public readAndParseAboveLogLevel(folder: string, file: string, requestLogLevel: string, offset?: number, limit?: number): LogRecordResponse {
        const parsedFile = this.readFile(folder, file).logRecordFiles;

        if (!(requestLogLevel in logLevel)) {
            throw new Error('no no no');
        }

        let parsedLogLevel: number = logLevel[requestLogLevel as keyof typeof logLevel];
        const desiredLogLevels: string[] = [];

        while (parsedLogLevel !== 0) {
            desiredLogLevels.push(logLevel[parsedLogLevel].toUpperCase())
            parsedLogLevel = parsedLogLevel - 1;
        }

        desiredLogLevels.push(logLevel[logLevel.emergency].toUpperCase());

        let filteredParts: LogRecord[] = this.filterMultipleLevels(parsedFile, desiredLogLevels);
        let linesCount = filteredParts.length;

        if (offset !== null && limit !== null) {
            filteredParts = filteredParts.slice(offset, offset + limit);
        }

        return {
            filtered: false,
            linesCount: linesCount,
            logRecordFiles: filteredParts,
            limit: limit,
            offset: offset
        }
    }

    private filterMultipleLevels(parsedLogRecords: LogRecord[], requestLogLevels: string[]): LogRecord[] {
        let filteredParts: LogRecord[] = [];
        parsedLogRecords.forEach(function (value: LogRecord) {
            if (requestLogLevels.includes(value.level_name.toUpperCase())) {
                filteredParts.push(value);
            }
        })

        return filteredParts;
    }
}