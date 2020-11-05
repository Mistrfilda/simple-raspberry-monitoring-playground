import path from 'path';
import fs from 'fs';
import {logLevel} from './LogLevel'
import {LogRecord} from "./LogRecord";

export default class logReader {

    static app1_log_folder = path.join(__dirname, '../../tests/files');

    public getList(folder: string): string[] {
        return fs.readdirSync(folder);
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

        console.log(parsedLogLevel);
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