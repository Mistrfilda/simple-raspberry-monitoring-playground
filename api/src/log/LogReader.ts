import path from 'path';
import fs from 'fs';
import {logLevel} from './LogLevel'
import {isString} from "util";

export default class logReader {

    static app1_log_folder: string = path.join(__dirname, '../../tests/files');

    static monolog_prefix: string = 'default';

    public getList(folder: string): string[] {
        return fs.readdirSync(folder);
    }

    public readFile(folder: string, file: string): string[] {
        let fileContents = fs.readFileSync(path.join(folder, file), 'utf-8');
        return fileContents.split("\n");
    }

    public readAndParseLogLevel(folder: string, file: string, requestLogLevel: string): string[] {
        let parsedFile = this.readFile(folder, file);
        let filteredParts: string[] = [];

        if (!(requestLogLevel in logLevel)) {
            throw new Error('no no no');
        }

        parsedFile.forEach(function (value: string, index: number) {
            if (value.includes(logReader.monolog_prefix + '.' + requestLogLevel.toUpperCase())) {
                filteredParts.push(value);
            }
        })

        return filteredParts;
    }

    public readAndParseAboveLogLevel(folder: string, file: string, requestLogLevel: string): string[] {
        let parsedFile = this.readFile(folder, file);
        let filteredParts: string[] = [];

        // @ts-ignore
        let maxIndex: number = Object.keys(logLevel).find(key => logLevel[key] === requestLogLevel)
        if (maxIndex === undefined) {
            throw new Error('no no no');
        }

        Object.values(logLevel).map(function (element: any, index: number) {
            if (typeof element === 'string' && (index <= maxIndex)) {
                parsedFile.forEach(function (value: string, index: number) {
                    if (value.includes(logReader.monolog_prefix + '.' + element.toUpperCase())) {
                        filteredParts.push(value);
                    }
                })
            }
        });

        return filteredParts;
    }
}