import {Request, Response} from "express";
import SystemInformationReader from "./SystemInformationReader";
import {Systeminformation} from "systeminformation";

import CpuTemperatureData = Systeminformation.CpuTemperatureData;
import CpuData = Systeminformation.CpuData;
import CpuCurrentSpeedData = Systeminformation.CpuCurrentSpeedData;
import MemData = Systeminformation.MemData;

const systemInformationReader = new SystemInformationReader();

import {SystemInformationResultValues} from "./SystemInformationResultValues";

import ResultValues = SystemInformationResultValues.allInformation;
import {BaseController} from "../controller/BaseController";

export default class SystemInformationController extends BaseController {

    public getCurrentCpuTemperature(req: Request, res: Response) {
        systemInformationReader.getCurrentCpuTemperature()
            .then(function (data: CpuTemperatureData) {
                res.json({'temperature': data.main});
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getCpuInfo(req: Request, res: Response) {
        systemInformationReader.getCpuInfo()
            .then(function (data: CpuData) {
                res.json({
                    'manufacturer': data.manufacturer,
                    'brand': data.brand,
                    'speed': data.speed,
                    'cores': data.cores,
                });
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getCurrentCpuLoad(req: Request, res: Response) {
        systemInformationReader.getCurrentCpuLoadInfo()
            .then(function (data: CpuCurrentSpeedData) {
                res.json({
                    'min': data.min,
                    'max': data.max,
                    'avg': data.avg,
                    'cores': data.cores,
                });
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getCurrentRamUsage(req: Request, res: Response) {
        systemInformationReader.getRamUsageInfo()
            .then(function (data: MemData) {
                res.json({
                    'total': data.total,
                    'free': data.free,
                    'used': data.used,
                    'swapTotal': data.swaptotal,
                    'swapFree': data.swapfree,
                    'swapUsed': data.swapused
                });
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

    public getAllData(req: Request, res: Response) {
        systemInformationReader.getAllInfo()
            .then(function (data: ResultValues) {
                res.json(data)
            })
            .catch(function (error: string) {
                throw new Error(error);
            });
    }

}