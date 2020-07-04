import express from 'express';
import * as logController from './log/LogController';
import * as systemInformationController from './systemInformation/SystemInformationController';

const app = express();
const port = 8080;

app.get('/app1/logs', logController.getAppLogs);
app.get('/app1/logs/:logId', logController.getAppLogContents);
app.get('/app1/logs/:logId/level/:filtered', logController.getAppLogContentsFilterLogLevel)
app.get('/app1/logs/:logId/filter/:filtered', logController.getAppLogContentsFilterAboveLogLevel)

app.get('/app1/system/cpuinfo', systemInformationController.getCpuInfo);
app.get('/app1/system/cputemp', systemInformationController.getCurrentCpuTemperature);
app.get('/app1/system/cpuload', systemInformationController.getCurrentCpuLoad);

app.get('/app1/system/raminfo', systemInformationController.getCurrentRamUsage);

// start the Express server
app.listen(port, function() {
    console.log(`server started at http://localhost:${ port }` );
});