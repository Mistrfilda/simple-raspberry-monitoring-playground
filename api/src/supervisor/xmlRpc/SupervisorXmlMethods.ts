export enum AvailableMethods {
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

export enum SupervisorState {
    FATAL = 2,
    RUNNING = 1,
    RESTARTING = 0,
    SHUTDOWN = -1
}