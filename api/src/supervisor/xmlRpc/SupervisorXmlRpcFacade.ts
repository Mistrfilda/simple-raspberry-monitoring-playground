import {SupervisorXmlRpcParser} from "./SupervisorXmlRpcParser";
import Axios, {AxiosInstance} from "axios";
import http from "http";
import { getRequestXml } from "./SupervisorRequestXmlGetter";
import {SupervisorVersion} from "./response/SupervisorVersion";
import { SupervisorXmlRpcMethod } from "./enum/SupervisorXmlMethods";
import * as z from "zod";
import {SupervisorState} from "./enum/SupervisorState";
import {SupervisorStateInfo, supervisorStateInfoSchema} from "./response/SupervisorStateInfo";
import {ProcessInfo, processInfoSchema} from "./response/ProcessInfo";
import {SupervisorProcessState} from "./enum/SupervisorProcessState";

export class SupervisorXmlRpcFacade {
    supervisorXmlParser: SupervisorXmlRpcParser;

    axiosInstance: AxiosInstance;

    constructor(supervisorXmlRpcBasePath: string) {
        this.supervisorXmlParser = new SupervisorXmlRpcParser();

        this.axiosInstance = Axios.create({
            baseURL: supervisorXmlRpcBasePath,
            timeout: 3000,
            headers: {'Content-Type': 'text/xml'},
            httpAgent: new http.Agent({keepAlive: true}),
        });
    }

    public async getSupervisorVersion(): Promise<SupervisorVersion> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXml(SupervisorXmlRpcMethod.supervisorVersion)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        if (typeof parsedXml !== 'string') {
            throw new Error('Invalid xml returned');
        }

        return {
            version: parsedXml
        }
    }

    public async getSupervisorState(): Promise<SupervisorStateInfo> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXml(SupervisorXmlRpcMethod.currentSupervisorState)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        return supervisorStateInfoSchema.parse(parsedXml);
    }

    public async getAllProcesses(): Promise<ProcessInfo[]> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXml(SupervisorXmlRpcMethod.allProcessInfo)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        return z.array(processInfoSchema).parse(parsedXml);
    }
}