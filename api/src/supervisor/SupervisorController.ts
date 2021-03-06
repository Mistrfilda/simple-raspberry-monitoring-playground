import {BaseController} from "../controller/BaseController";
import {SupervisorXmlRpcFacade} from "./xmlRpc/SupervisorXmlRpcFacade";
import {ConfigDefinition} from "../config/ConfigDefinition";
import {Request, Response, NextFunction} from "express";
import {SupervisorVersion} from "./xmlRpc/response/SupervisorVersion";
import {SupervisorStateInfo} from "./xmlRpc/response/SupervisorStateInfo";
import {ProcessInfo} from "./xmlRpc/response/ProcessInfo";
import {AllSupervisorInfo} from "./xmlRpc/response/AllSupervisorInfo";
import {StopSupervisorProcess} from "./xmlRpc/response/StopSupervisorProcess";
import {StartSupervisorProcess} from "./xmlRpc/response/StartSupervisorProcess";
import * as z from "zod";

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

    public getAllSupervisorInfo(req: Request, res: Response) {
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

    public stopProcess(req: Request, res: Response, next: NextFunction) {
        const validatedBody = z.object({
            process: z.string()
        }).parse(req.body);

        this.supervisorXmlRpcFacade.stopSupervisorProcess(validatedBody.process)
            .then(function (data: StopSupervisorProcess) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public startProcess(req: Request, res: Response) {
        const validatedBody = z.object({
            process: z.string()
        }).parse(req.body);


        this.supervisorXmlRpcFacade.startSupervisorProcess(validatedBody.process)
            .then(function (data: StartSupervisorProcess) {
                res.json(data);
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }
}