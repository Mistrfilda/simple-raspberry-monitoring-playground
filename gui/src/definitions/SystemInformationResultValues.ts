export namespace SystemInformationResultValues {
  export interface cpuInfo {
    manufacturer: string;
    brand: string;
    speed: string;
    cores: number;
  }

  export interface temperatureInfo {
    temperature: number;
  }

  export interface cpuSpeedInfo {
    min: number;
    max: number;
    avg: number;
    cores: number[];
  }

  export interface currentCpuLoad {
    currentload: number;
    currentloadUser: number;
    currentloadSystem: number;
    cpuCoresLoads: cpuCoreLoadInfo[];
  }

  export interface cpuCoreLoadInfo {
    load: number;
    loadUser: number;
    loadSystem: number;
  }

  export interface ramUsage {
    total: number;
    free: number;
    used: number;
    swapTotal: number;
    swapFree: number;
    swapUsed: number;
  }

  export interface allInformation {
    cpuInfo: cpuInfo;
    cpuSpeedInfo: cpuSpeedInfo;
    currentCpuLoadInfo: currentCpuLoad;
    ramUsage: ramUsage;
    temperatureInfo: temperatureInfo;
  }
}
