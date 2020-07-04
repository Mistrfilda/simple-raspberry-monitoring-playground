import si, {Systeminformation} from 'systeminformation';

export default class SystemInformationReader {
    public async getCurrentCpuTemperature(): Promise<Systeminformation.CpuTemperatureData> {
        return si.cpuTemperature();
    }

    public async getCpuInfo(): Promise<Systeminformation.CpuData> {
        return si.cpu();
    }

    public async getCurrentCpuLoadinfo(): Promise<Systeminformation.CpuCurrentSpeedData> {
        return si.cpuCurrentspeed();
    }

    public async getRamUsageInfo(): Promise<Systeminformation.MemData> {
        return si.mem();
    }
}