import { LogLevelNumber } from "@/definitions/LogLevel";

export function getLogLevelBadgeColor(levelNumber: number): string {
  switch (levelNumber) {
    case LogLevelNumber.debug:
      return "text-gray-800 bg-gray-300";
    case LogLevelNumber.info:
      return "text-green-800 bg-green-100";
    case LogLevelNumber.notice:
      return "text-yellow-800 bg-yellow-100";
    case LogLevelNumber.warning:
      return "text-orange-800 bg-orange-100";
    case LogLevelNumber.error:
      return "text-red-800 bg-red-100";
    case LogLevelNumber.critical:
      return "text-red-800 bg-red-100";
    case LogLevelNumber.alert:
      return "text-red-800 bg-red-100";
    case LogLevelNumber.emergency:
      return "text-red-800 bg-red-100";
    default:
      throw new Error("Invalid log level");
  }
}
