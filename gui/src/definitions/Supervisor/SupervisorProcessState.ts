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

export enum SupervisorProcessStateColor {
  STOPPED = "red",
  STARTING = "blue",
  RUNNING = "green",
  BACKOFF = "orange",
  STOPPING = "orange",
  EXITED = "red",
  FATAL = "red",
  UNKNOWN = "red"
}
