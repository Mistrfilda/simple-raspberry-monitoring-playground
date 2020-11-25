import {ConfigDefinition} from "./ConfigDefinition";
import path from "path";

const defaultConfig: ConfigDefinition = {
    appLogFolder: path.join(__dirname, '../../tests/files'),
    supervisor: {
        xmlRpc: {
            supervisorXmlRpcBasePath: "http://localhost:9001/RPC2/"
        }
    }
};

export { defaultConfig };