import {Request, Response} from "express";
import LogReader from "./LogReader";

const logReader = new LogReader();

export const getAppLogs = function (req: Request, res: Response): void {
    res.json(logReader.getList(LogReader.app1_log_folder));
}

export const getAppLogContents = function (req: Request, res: Response): void {
    res.json(logReader.readFile(LogReader.app1_log_folder, req.params.logId));
};

export const getAppLogContentsFilterLogLevel = function (req: Request, res: Response): void {
    res.json(logReader.readAndParseLogLevel(LogReader.app1_log_folder, req.params.logId, req.params.filtered));
};

export const getAppLogContentsFilterAboveLogLevel = function (req: Request, res: Response): void {
    res.json(logReader.readAndParseAboveLogLevel(LogReader.app1_log_folder, req.params.logId, req.params.filtered));
};