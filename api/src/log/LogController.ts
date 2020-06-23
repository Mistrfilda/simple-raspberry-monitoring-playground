import {Request, Response} from "express";
import LogReader from "./LogReader";

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