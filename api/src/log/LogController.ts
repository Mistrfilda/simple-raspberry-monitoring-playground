import {Request, Response} from "express";
import LogReader from "./LogReader";
import {logLevel} from "./LogLevel";

let logReader = new LogReader();

export const getDefault = function (req: Request, res: Response) {
    res.send('Hello world2');
}

export const getMultiple = function (req: Request, res: Response) {
    res.send('Hello world4');
}

export const getAppLogs = function (req: Request, res: Response) {
    res.json(logReader.getList(LogReader.app1_log_folder));
}

export const getAppLogContents = function (req: Request, res: Response) {
    res.json(logReader.readFile(LogReader.app1_log_folder, req.params.logId));
};

export const getAppLogContentsFilterLogLevel = function (req: Request, res: Response) {
    res.json(logReader.readAndParseLogLevel(LogReader.app1_log_folder, req.params.logId, req.params.filtered));
};

export const getAppLogContentsFilterAboveLogLevel = function (req: Request, res: Response) {
    res.json(logReader.readAndParseAboveLogLevel(LogReader.app1_log_folder, req.params.logId, req.params.filtered));
};