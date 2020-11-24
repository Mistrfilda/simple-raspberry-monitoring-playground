#!/usr/bin/env node

import yargs from 'yargs';
// @ts-ignore
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;
import http from 'http';
import axios from 'axios';

const serverUrl = 'http://localhost:9001/RPC2';

// axios config
const config = {
    headers: {'Content-Type': 'text/xml'},
    httpAgent: new http.Agent({keepAlive: true}),
};

const xml = '<?xml version="1.0"?><methodCall><methodName>supervisor.getSupervisorVersion</methodName></methodCall>';

axios.post(serverUrl, xml, config).then(res => {
    console.log(res.data);
}).then(res => {
});