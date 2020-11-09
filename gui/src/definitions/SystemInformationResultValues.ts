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

  export interface cpuLoadInfo {
    min: number;
    max: number;
    avg: number;
    cores: number[];
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
    cpuLoadInfo: cpuLoadInfo;
    ramUsage: ramUsage;
    temperatureInfo: temperatureInfo;
  }
}
