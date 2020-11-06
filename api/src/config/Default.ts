import {ConfigDefinition} from "./ConfigDefinition";
import path from "path";

const defaultConfig: ConfigDefinition = {
    appLogFolder: path.join(__dirname, '../../tests/files'),
};

export { defaultConfig };