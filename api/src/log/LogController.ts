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
        res.json(this.logReader.getFullList(this.appLogFolder));
    }

    public getAppLogContents(req: Request, res: Response): void {
        res.json(this.logReader.readFile(
            this.appLogFolder,
            this.logReader.getFilenameFromHash(this.appLogFolder, req.params.logHash),
            this.getNumberQueryParameter(req, 'offset'),
            this.getNumberQueryParameter(req, 'limit')),
        );
    };

    public getAppLogContentsFilterLogLevel(req: Request, res: Response): void {
        res.json(this.logReader.readAndParseLogLevel(
            this.appLogFolder, this.logReader.getFilenameFromHash(this.appLogFolder, req.params.logHash),
            req.params.filtered,
            this.getNumberQueryParameter(req, 'offset'),
            this.getNumberQueryParameter(req, 'limit')
            )
        );
    };

    public getAppLogContentsFilterAboveLogLevel(req: Request, res: Response): void {
        res.json(this.logReader.readAndParseAboveLogLevel(
            this.appLogFolder,
            this.logReader.getFilenameFromHash(this.appLogFolder, req.params.logHash),
            req.params.filtered,
            this.getNumberQueryParameter(req, 'offset'),
            this.getNumberQueryParameter(req, 'limit')
            )
        );
    };

    public getAppLogContentsFilterMultipleLogLevels(req: Request, res: Response): void {
        res.json(this.logReader.readAndParseMultipleLogLevels(
            this.appLogFolder,
            this.logReader.getFilenameFromHash(this.appLogFolder, req.params.logHash),
            this.getStringArrayQueryParameter(req, 'loglevels'),
            this.getNumberQueryParameter(req, 'offset'),
            this.getNumberQueryParameter(req, 'limit')
            )
        );
    }
}