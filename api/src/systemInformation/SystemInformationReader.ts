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

    public async getCurrentCpuSpeed(): Promise<Systeminformation.CpuCurrentSpeedData> {
        return si.cpuCurrentspeed();
    }

    public async getRamUsageInfo(): Promise<Systeminformation.MemData> {
        return si.mem();
    }

    public async getCurrentLoad(): Promise<Systeminformation.CurrentLoadData> {
        return si.currentLoad();
    }

    public async getAllInfo(): Promise<ResultValues>
    {
        const cpuTemperature = await this.getCurrentCpuTemperature();
        const cpuInfo = await this.getCpuInfo();
        const currentCpuSpeedInfo = await this.getCurrentCpuSpeed();
        const ramUsageInfo = await this.getRamUsageInfo();
        const currentCpuLoad = await this.getCurrentLoad();

        const coresSpeeds: SystemInformationResultValues.cpuCoreLoadInfo[] = [];
        currentCpuLoad.cpus.forEach(function (data: Systeminformation.CurrentLoadCpuData) {
            coresSpeeds.push({
                load: data.load,
                loadUser: data.load_user,
                loadSystem: data.load_system,
            })
        });

        const result: ResultValues = {
            cpuInfo: {
                manufacturer: cpuInfo.manufacturer,
                brand: cpuInfo.brand,
                speed: cpuInfo.speed,
                cores: cpuInfo.cores,
            },
            cpuSpeedInfo: {
                min: currentCpuSpeedInfo.min,
                max: currentCpuSpeedInfo.max,
                avg: currentCpuSpeedInfo.avg,
                cores: currentCpuSpeedInfo.cores,
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
            },
            currentCpuLoadInfo: {
                currentload: currentCpuLoad.currentload,
                currentloadUser: currentCpuLoad.currentload_user,
                currentloadSystem: currentCpuLoad.currentload_system,
                cpuCoresLoads: coresSpeeds

            }
        };

        return new Promise(function (resolve, reject) {
            resolve(result)
        });
    }
}