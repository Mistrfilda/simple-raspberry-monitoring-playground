import {Request, Response} from "express";
import {ParsedQs} from "qs";
import {ConfigDefinition} from "../config/ConfigDefinition";

export abstract class BaseController {

    config: ConfigDefinition;

    constructor(config: ConfigDefinition) {
        this.config = config;
    }


    protected getStringQueryParameter(req: Request, name: string): string | null {
        const value = req.query[name];
        if (value === undefined) {
            return null;
        }

        return String(value);
    }

    protected getNumberQueryParameter(req: Request, name: string): number | null {
        const value = req.query[name];
        if (value === undefined) {
            return null;
        }

        return Number(value);
    }

    protected getStringArrayQueryParameter(req: Request, name: string): string[] | null {
        const value = req.query[name];
        if (value === undefined) {
            return null;
        }

        if (Array.isArray(value)) {
            const results: string[] = [];
            value.forEach(function (arrayValue: string | ParsedQs) {
                results.push(String(arrayValue));
            })

            return results;
        }

        return [String(value)];
    }
}