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

    interface cpuLoadInfo {
        min: number;
        max: number;
        avg: number;
        cores: number[];
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
        cpuLoadInfo: cpuLoadInfo;
        ramUsage: ramUsage;
        temperatureInfo: temperatureInfo
    }
}