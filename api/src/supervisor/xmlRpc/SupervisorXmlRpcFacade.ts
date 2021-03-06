import {SupervisorXmlRpcParser} from "./SupervisorXmlRpcParser";
import Axios, {AxiosInstance} from "axios";
import http from "http";
import {getRequestXml, getRequestXmlWithParam} from "./SupervisorRequestXmlGetter";
import {SupervisorVersion} from "./response/SupervisorVersion";
import {SupervisorXmlRpcMethod} from "./enum/SupervisorXmlMethods";
import * as z from "zod";
import {SupervisorStateInfo, supervisorStateInfoSchema} from "./response/SupervisorStateInfo";
import {ProcessInfo, processInfoSchema} from "./response/ProcessInfo";
import {SupervisorApiVersion} from "./response/SupervisorApiVersion";
import {AllSupervisorInfo} from "./response/AllSupervisorInfo";
import {StopSupervisorProcess, stopSupervisorProcessError} from "./response/StopSupervisorProcess";
import {StartSupervisorProcess, startSupervisorProcessError} from "./response/StartSupervisorProcess";

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

    public async getSupervisorApiVersion(): Promise<SupervisorApiVersion> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXml(SupervisorXmlRpcMethod.supervisorVersion)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        if (typeof parsedXml !== 'string') {
            throw new Error('Invalid xml returned');
        }

        return {
            apiVersion: parsedXml
        }
    }

    public async stopSupervisorProcess(processName: string): Promise<StopSupervisorProcess> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXmlWithParam(SupervisorXmlRpcMethod.stopProcess, processName)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        if (typeof parsedXml === 'boolean') {
            return {
                success: parsedXml
            }
        }

        const parsedResponse = stopSupervisorProcessError.parse(parsedXml);

        return {
            success: false,
            message: parsedResponse.faultString
        }
    }

    public async startSupervisorProcess(processName: string): Promise<StartSupervisorProcess> {
        const requestResponse = await this.axiosInstance.post(
            '',
            getRequestXmlWithParam(SupervisorXmlRpcMethod.startProcess, processName)
        );

        const parsedXml = this.supervisorXmlParser.parseXml(requestResponse.data);
        if (typeof parsedXml === 'boolean') {
            return {
                success: parsedXml
            }
        }

        const parsedResponse = startSupervisorProcessError.parse(parsedXml);

        return {
            success: false,
            message: parsedResponse.faultString
        }
    }

    public async getAllSupervisorInfo(): Promise<AllSupervisorInfo> {
        const supervisorVersion = await this.getSupervisorVersion();
        const apiVersion = await this.getSupervisorApiVersion();
        const state = await this.getSupervisorState();

        return {
            apiVersion: apiVersion,
            supervisorVersion: supervisorVersion,
            state: state
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