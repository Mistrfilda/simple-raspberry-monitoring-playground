import express, {Request, Response} from 'express';
import LogController from "./log/LogController";
import ConfigGetter from "./config/ConfigGetter";
import SystemInformationController from "./systemInformation/SystemInformationController";

const app = express();
const port = 30300;
const config = (new ConfigGetter()).getConfig();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});


const logController = new LogController(config.appLogFolder);
const systemInformationController = new SystemInformationController();

app.get('/app1/logs', (req: express.Request, res: express.Response) => { logController.getAppLogs(req, res) });
app.get('/app1/logs/:logId', (req: express.Request, res: express.Response) => { logController.getAppLogContents(req, res) });
app.get('/app1/logs/:logId/level/:filtered', (req: express.Request, res: express.Response) => { logController.getAppLogContentsFilterLogLevel(req, res) })
app.get('/app1/logs/:logId/filter/:filtered', (req: express.Request, res: express.Response) => { logController.getAppLogContentsFilterAboveLogLevel(req, res) })

app.get('/app1/system/cpuinfo', (req: express.Request, res: express.Response) => { systemInformationController.getCpuInfo(req, res) });
app.get('/app1/system/cputemp', (req: express.Request, res: express.Response) => { systemInformationController.getCurrentCpuTemperature(req, res) });
app.get('/app1/system/cpuload', (req: express.Request, res: express.Response) => { systemInformationController.getCurrentCpuLoad(req, res) });

app.get('/app1/system/raminfo', (req: express.Request, res: express.Response) => { systemInformationController.getCurrentRamUsage(req, res) });

app.get('/app1/system/getAll', (req: express.Request, res: express.Response) => { systemInformationController.getAllData(req, res) });

// start the Express server
app.listen(port, function() {
    console.log(`server started at http://localhost:${ port }` );
});