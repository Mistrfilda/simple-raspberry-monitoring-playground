import {
  SupervisorProcessState,
  SupervisorProcessStateColor
} from "@/definitions/Supervisor/SupervisorProcessState";

export function getBadgeClass(color: string): string {
  return "bg-" + color + "-100 text-" + color + "-800";
}

export function getProcessStatenameColor(statecode: number): string {
  switch (statecode) {
    case SupervisorProcessState.BACKOFF:
      return getBadgeClass(SupervisorProcessStateColor.BACKOFF);
    case SupervisorProcessState.EXITED:
      return getBadgeClass(SupervisorProcessStateColor.EXITED);
    case SupervisorProcessState.FATAL:
      return getBadgeClass(SupervisorProcessStateColor.FATAL);
    case SupervisorProcessState.RUNNING:
      return getBadgeClass(SupervisorProcessStateColor.RUNNING);
    case SupervisorProcessState.STARTING:
      return getBadgeClass(SupervisorProcessStateColor.STARTING);
    case SupervisorProcessState.STOPPED:
      return getBadgeClass(SupervisorProcessStateColor.STOPPED);
    case SupervisorProcessState.STOPPING:
      return getBadgeClass(SupervisorProcessStateColor.STOPPING);
    case SupervisorProcessState.UNKNOWN:
      return getBadgeClass(SupervisorProcessStateColor.UNKNOWN);
    default:
      throw new Error("Invalid state " + statecode);
  }
}
