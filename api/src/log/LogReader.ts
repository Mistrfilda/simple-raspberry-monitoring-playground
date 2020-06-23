import path from 'path';
import fs from 'fs';

export default class logReader {
    static app1_log_folder = path.join(__dirname, '../../tests/files');

    public getList(folder: string): string[] {
        return fs.readdirSync(folder);
    }

    public readFile(folder: string, file: string): string[] {
        let fileContents = fs.readFileSync(path.join(folder, file), 'utf-8');
        return fileContents.split("\n");
    }
}