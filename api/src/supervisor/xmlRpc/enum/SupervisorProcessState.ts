export enum SupervisorProcessState {
    STOPPED = 0,
    STARTING = 10,
    RUNNING = 20,
    BACKOFF = 30,
    STOPPING = 40,
    EXITED = 100,
    FATAL = 200,
    UNKNOWN = 1000
}