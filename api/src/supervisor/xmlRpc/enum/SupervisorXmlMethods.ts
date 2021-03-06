export enum SupervisorXmlRpcMethod {
    apiVersion= 'getAPIVersion',
    allProcesses = 'getAllProcessInfo',
    supervisorVersion = 'getSupervisorVersion',
    currentSupervisorState = 'getState',
    shutdown = 'shutdown',
    restart = 'restart',
    processInfo = 'getProcessInfo',
    allProcessInfo = 'getAllProcessInfo',
    startProcess = 'startProcess',
    startAllProcesses = 'startAllProcesses',
    startProcessGroup = 'startProcessGroup',
    stopProcess = 'stopProcess',
    stopProcessGroup = 'stopProcessGroup',
    stopAllProcesses = 'stopAllProcesses',
    reloadConfig = 'reloadConfig',
}