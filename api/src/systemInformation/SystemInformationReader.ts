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
        let cpuTemperature = await this.getCurrentCpuTemperature();
        let cpuInfo = await this.getCpuInfo();
        let currentCpuSpeedInfo = await this.getCurrentCpuSpeed();
        let ramUsageInfo = await this.getRamUsageInfo();
        let currentCpuLoad = await this.getCurrentLoad();

        let coresSpeeds: SystemInformationResultValues.cpuCoreLoadInfo[] = [];
        currentCpuLoad.cpus.forEach(function (data: Systeminformation.CurrentLoadCpuData) {
            coresSpeeds.push({
                load: data.load,
                loadUser: data.load_user,
                loadSystem: data.load_system,
            })
        });

        let result: ResultValues = {
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