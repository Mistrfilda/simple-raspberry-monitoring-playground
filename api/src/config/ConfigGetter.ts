import {ConfigDefinition} from "./ConfigDefinition";
import {defaultConfig} from "./Default";
import {local} from "./Local";


export default class ConfigGetter {
    public getConfig(): ConfigDefinition {
        const prodHost = process.env.PROD_HOST;

        if (prodHost !== undefined) {
            return local;
        }

        return defaultConfig;
    }
}