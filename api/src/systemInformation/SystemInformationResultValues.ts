export namespace SystemInformationResultValues {
    interface cpuInfo {
        manufacturer: string;
        brand: string;
        speed: string;
        cores: number;
    }

    interface temperatureInfo {
        temperature: number;
    }

    interface cpuSpeedInfo {
        min: number;
        max: number;
        avg: number;
        cores: number[];
    }

    interface currentCpuLoad {
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

    interface ramUsage {
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
        currentCpuLoadInfo: currentCpuLoad
        ramUsage: ramUsage;
        temperatureInfo: temperatureInfo;
    }
}