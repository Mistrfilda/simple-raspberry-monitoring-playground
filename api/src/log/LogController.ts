import {Request, Response} from "express";
import LogReader from "./LogReader";
import {BaseController} from "../controller/BaseController";

export default class logController extends BaseController {

    logReader: LogReader;

    appLogFolder: string;

    constructor(appLogFolder: string) {
        super();
        this.logReader = new LogReader();
        this.appLogFolder = appLogFolder;
    }

    public getAppLogs(req: Request, res: Response): void {
        res.json(this.logReader.getList(this.appLogFolder));
    }

    public getAppLogContents(req: Request, res: Response): void {
        res.json(this.logReader.readFile(this.appLogFolder, req.params.logId));
    };

    public getAppLogContentsFilterLogLevel(req: Request, res: Response): void {
        res.json(this.logReader.readAndParseLogLevel(this.appLogFolder, req.params.logId, req.params.filtered));
    };

    public getAppLogContentsFilterAboveLogLevel(req: Request, res: Response): void {
        res.json(this.logReader.readAndParseAboveLogLevel(this.appLogFolder, req.params.logId, req.params.filtered));
    };
}