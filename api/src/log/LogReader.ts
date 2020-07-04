import path from 'path';
import fs from 'fs';
import {logLevel} from './LogLevel'

export default class logReader {

    static app1_log_folder = path.join(__dirname, '../../tests/files');

    static monolog_prefix = 'default';

    public getList(folder: string): string[] {
        return fs.readdirSync(folder);
    }

    public readFile(folder: string, file: string): string[] {
        const fileContents = fs.readFileSync(path.join(folder, file), 'utf-8');
        return fileContents.split("\n");
    }

    public readAndParseLogLevel(folder: string, file: string, requestLogLevel: string): string[] {
        const parsedFile = this.readFile(folder, file);
        const filteredParts: string[] = [];

        if (!(requestLogLevel in logLevel)) {
            throw new Error('no no no');
        }

        parsedFile.forEach(function (value: string) {
            if (value.includes(logReader.monolog_prefix + '.' + requestLogLevel.toUpperCase())) {
                filteredParts.push(value);
            }
        })

        return filteredParts;
    }

    public readAndParseAboveLogLevel(folder: string, file: string, requestLogLevel: string): string[] {
        const parsedFile = this.readFile(folder, file);
        const filteredParts: string[] = [];

        // @ts-ignore
        const maxIndex: number = Object.keys(logLevel).find(key => logLevel[key] === requestLogLevel)
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