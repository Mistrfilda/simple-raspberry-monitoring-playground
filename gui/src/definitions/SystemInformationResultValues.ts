export namespace SystemInformationResultValues {
  export interface CpuInfo {
    manufacturer: string;
    brand: string;
    speed: string;
    cores: number;
  }

  export interface TemperatureInfo {
    temperature: number;
  }

  export interface CpuSpeedInfo {
    min: number;
    max: number;
    avg: number;
    cores: number[];
  }

  export interface CurrentCpuLoad {
    currentload: number;
    currentloadUser: number;
    currentloadSystem: number;
    cpuCoresLoads: CpuCoreLoadInfo[];
  }

  export interface CpuCoreLoadInfo {
    load: number;
    loadUser: number;
    loadSystem: number;
  }

  export interface RamUsage {
    total: number;
    free: number;
    used: number;
    swapTotal: number;
    swapFree: number;
    swapUsed: number;
  }

  export interface AllInformation {
    cpuInfo: CpuInfo;
    cpuSpeedInfo: CpuSpeedInfo;
    currentCpuLoadInfo: CurrentCpuLoad;
    ramUsage: RamUsage;
    temperatureInfo: TemperatureInfo;
  }
}
