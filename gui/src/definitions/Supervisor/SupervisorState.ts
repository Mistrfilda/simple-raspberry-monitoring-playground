export enum SupervisorState {
  FATAL = 2,
  RUNNING = 1,
  RESTARTING = 0,
  SHUTDOWN = -1
}

export enum SupervisorStateColor {
  FATAL = "red",
  RUNNING = "green",
  RESTARTING = "orange",
  SHUTDOWN = "gray"
}
