import express, {Request, Response} from 'express';
import LogController from "./log/LogController";
import ConfigGetter from "./config/ConfigGetter";
import SystemInformationController from "./systemInformation/SystemInformationController";
import SupervisorController from "./supervisor/SupervisorController";
import bodyParser from 'body-parser';
import {addHeadersMiddleware} from "./express/middleware/AddHeadersMiddleware";
import {errorMiddleware} from "./express/middleware/ErrorMiddleware";

const app = express();
const port = 30300;
const config = (new ConfigGetter()).getConfig();

//Post body parser
app.use(bodyParser.json());

// Add headers
app.use(addHeadersMiddleware);

const logController = new LogController(config);
const systemInformationController = new SystemInformationController(config);
const supervisorController = new SupervisorController(config);

app.get('/app1/status', (req: express.Request, res: express.Response) => {
    res.json({status: 'ok'});
});

app.get('/app1/logs', (req: express.Request, res: express.Response) => {
    logController.getAppLogs(req, res)
});
app.get('/app1/logs/:logHash', (req: express.Request, res: express.Response) => {
    logController.getAppLogContents(req, res)
});
app.get('/app1/logs/:logHash/info', (req: express.Request, res: express.Response) => {
    logController.getFileInfo(req, res)
});
app.get('/app1/logs/:logHash/level/:filtered', (req: express.Request, res: express.Response) => {
    logController.getAppLogContentsFilterLogLevel(req, res)
})
app.get('/app1/logs/:logHash/levels', (req: express.Request, res: express.Response) => {
    logController.getAppLogContentsFilterMultipleLogLevels(req, res)
})
app.get('/app1/logs/:logHash/filter/:filtered', (req: express.Request, res: express.Response) => {
    logController.getAppLogContentsFilterAboveLogLevel(req, res)
})

app.get('/app1/system/cpuinfo', (req: express.Request, res: express.Response) => {
    systemInformationController.getCpuInfo(req, res)
});
app.get('/app1/system/cputemp', (req: express.Request, res: express.Response) => {
    systemInformationController.getCurrentCpuTemperature(req, res)
});
app.get('/app1/system/cpuspeed', (req: express.Request, res: express.Response) => {
    systemInformationController.getCurrentCpuSpeed(req, res)
});

app.get('/app1/system/currentLoad', (req: express.Request, res: express.Response) => {
    systemInformationController.getCurrentLoad(req, res)
});

app.get('/app1/system/raminfo', (req: express.Request, res: express.Response) => {
    systemInformationController.getCurrentRamUsage(req, res)
});

app.get('/app1/system/getAll', (req: express.Request, res: express.Response) => {
    systemInformationController.getAllData(req, res)
});

app.get('/app1/supervisor/version', (req: express.Request, res: express.Response) => {
    supervisorController.getSupervisorVersion(req, res)
});

app.get('/app1/supervisor/state', (req: express.Request, res: express.Response) => {
    supervisorController.getSupervisorState(req, res)
});

app.get('/app1/supervisor/all-processes', (req: express.Request, res: express.Response) => {
    supervisorController.getAllProcesses(req, res)
});

app.get('/app1/supervisor/all-info', (req: express.Request, res: express.Response) => {
    supervisorController.getAllSupervisorInfo(req, res)
});

app.post('/app1/supervisor/start-process', (req: express.Request, res: express.Response) => {
    supervisorController.startProcess(req, res)
});

app.post('/app1/supervisor/stop-process', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    supervisorController.stopProcess(req, res, next)
});

// @ts-ignore
app.use(errorMiddleware);

// start the Express server
app.listen(port, function () {
    console.log(`server started at http://localhost:${port}`);
});