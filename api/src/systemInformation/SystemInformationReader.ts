import si, {Systeminformation} from 'systeminformation';
import {SystemInformationResultValues} from "./SystemInformationResultValues";

import ResultValues = SystemInformationResultValues.allInformation;

export default class SystemInformationReader {
    public async getCurrentCpuTemperature(): Promise<Systeminformation.CpuTemperatureData> {
        return si.cpuTemperature();
    }

    public async getCpuInfo(): Promise<Systeminformation.CpuData> {
        return si.cpu();
    }

    public async getCurrentCpuLoadInfo(): Promise<Systeminformation.CpuCurrentSpeedData> {
        return si.cpuCurrentspeed();
    }

    public async getRamUsageInfo(): Promise<Systeminformation.MemData> {
        return si.mem();
    }

    public async getAllInfo(): Promise<ResultValues>
    {
        let cpuTemperature = await this.getCurrentCpuTemperature();
        let cpuInfo = await this.getCpuInfo();
        let currentCpuLoadInfo = await this.getCurrentCpuLoadInfo();
        let ramUsageInfo = await this.getRamUsageInfo();

        let result: ResultValues = {
            cpuInfo: {
                manufacturer: cpuInfo.manufacturer,
                brand: cpuInfo.brand,
                speed: cpuInfo.speed,
                cores: cpuInfo.cores,
            },
            cpuLoadInfo: {
                min: currentCpuLoadInfo.min,
                max: currentCpuLoadInfo.max,
                avg: currentCpuLoadInfo.avg,
                cores: currentCpuLoadInfo.cores,
            },
            ramUsage: {
                total: ramUsageInfo.total,
                free: ramUsageInfo.free,
                used: ramUsageInfo.used,
                swapTotal: ramUsageInfo.swaptotal,
                swapFree: ramUsageInfo.swapfree,
                swapUsed: ramUsageInfo.swapused,
            },
            temperatureInfo: {
                temperature: cpuTemperature.main
            }
        };

        return new Promise(function (resolve, reject) {
            resolve(result)
        });
    }
}