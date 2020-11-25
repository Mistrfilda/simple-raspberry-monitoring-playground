import {ConfigDefinition} from "./ConfigDefinition";
import {local} from "./Local";


export default class ConfigGetter {
    public getConfig(): ConfigDefinition {
        return local;
    }
}