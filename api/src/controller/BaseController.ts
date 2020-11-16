import {Request, Response} from "express";
import {ParsedQs} from "qs";

export abstract class BaseController {
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
            let results: string[] = [];
            value.forEach(function (arrayValue: string | ParsedQs) {
                results.push(String(arrayValue));
            })

            return results;
        }

        return [String(value)];
    }
}