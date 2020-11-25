import {BaseController} from "../controller/BaseController";
import {SupervisorXmlRpcFacade} from "./xmlRpc/SupervisorXmlRpcFacade";
import {ConfigDefinition} from "../config/ConfigDefinition";

export default class SupervisorController extends BaseController {
    supervisorXmlRpcFacade: SupervisorXmlRpcFacade;

    constructor(config: ConfigDefinition) {
        super(config);
        this.supervisorXmlRpcFacade = new SupervisorXmlRpcFacade(config.supervisor.xmlRpc.supervisorXmlRpcBasePath);
    }

}