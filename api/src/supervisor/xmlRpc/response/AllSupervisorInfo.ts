import {SupervisorVersion} from "./SupervisorVersion";
import {SupervisorApiVersion} from "./SupervisorApiVersion";
import {SupervisorStateInfo} from "./SupervisorStateInfo";

export interface AllSupervisorInfo {
    supervisorVersion: SupervisorVersion
    apiVersion: SupervisorApiVersion;
    state: SupervisorStateInfo
}