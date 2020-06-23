import express from 'express';
import * as logController from "./log/LogController";

const app = express();
const port = 8080;

app.get('/log1', logController.getDefault);
app.get('/log2', logController.getMultiple);

app.get('/app1/logs', logController.getAppLogs);
app.get('/app1/logs/:logId', logController.getAppLogContents);

// start the Express server
app.listen(port, function() {
    console.log(`server started at http://localhost:${ port }` );
});