import path from 'path';
import fs from 'fs';
import {logLevel} from './LogLevel'
import {LogRecord} from "./LogRecord";
import {LogRecordFile} from "./LogRecordFile";
import has = Reflect.has;
const md5 = require('md5');
import _ from 'lodash';

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

    public readFile(folder: string, file: string): LogRecord[] {
        const fileContents = fs.readFileSync(path.join(folder, file), 'utf-8');

        return fileContents.split("\n").filter((line: string) => {
            return line !== '';
        }).map((line: string) => {
            return JSON.parse(line);
        });
    }

    public readAndParseLogLevel(folder: string, file: string, requestLogLevel: string): LogRecord[] {
        const parsedFile = this.readFile(folder, file);
        const filteredParts: LogRecord[] = [];

        if (!(requestLogLevel in logLevel)) {
            throw new Error('no no no');
        }

        parsedFile.forEach(function (value: LogRecord) {
            if (value.level_name === requestLogLevel.toUpperCase()) {
                filteredParts.push(value);
            }
        })

        return filteredParts;
    }

    public readAndParseAboveLogLevel(folder: string, file: string, requestLogLevel: string): LogRecord[] {
        const parsedFile = this.readFile(folder, file);
        const filteredParts: LogRecord[] = [];

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

        parsedFile.forEach(function (value: LogRecord) {
            if (desiredLogLevels.includes(value.level_name)) {
                filteredParts.push(value);
            }
        })

        return filteredParts;
    }
}