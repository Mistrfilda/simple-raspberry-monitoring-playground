import {BaseController} from "../controller/BaseController";
import {SupervisorXmlRpcFacade} from "./xmlRpc/SupervisorXmlRpcFacade";
import {ConfigDefinition} from "../config/ConfigDefinition";
import {Request, Response} from "express";
import {SupervisorVersion} from "./xmlRpc/response/SupervisorVersion";
import {SupervisorStateInfo} from "./xmlRpc/response/SupervisorStateInfo";
import {ProcessInfo} from "./xmlRpc/response/ProcessInfo";
import {AllSupervisorInfo} from "./xmlRpc/response/AllSupervisorInfo";

export default class SupervisorController extends BaseController {
    supervisorXmlRpcFacade: SupervisorXmlRpcFacade;

    constructor(config: ConfigDefinition) {
        super(config);
        this.supervisorXmlRpcFacade = new SupervisorXmlRpcFacade(config.supervisor.xmlRpc.supervisorXmlRpcBasePath);
    }

    public getSupervisorVersion(req: Request, res: Response) {
        this.supervisorXmlRpcFacade.getSupervisorVersion()
            .then(function (data: SupervisorVersion) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getSupervisorState(req: Request, res: Response) {
        this.supervisorXmlRpcFacade.getSupervisorState()
            .then(function (data: SupervisorStateInfo) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public async getAllSupervisorInfo(req: Request, res: Response) {
        this.supervisorXmlRpcFacade.getAllSupervisorInfo()
            .then(function (data: AllSupervisorInfo) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getAllProcesses(req: Request, res: Response) {
        this.supervisorXmlRpcFacade.getAllProcesses()
            .then(function (data: ProcessInfo[]) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }
}