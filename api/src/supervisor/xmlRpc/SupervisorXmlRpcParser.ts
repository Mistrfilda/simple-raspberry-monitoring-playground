import { ScalarValues, ObjectValues } from "./enum/SupervisorXmlRpcObjectKeys";

const xml2js = require('xml2js').Parser();

export class SupervisorXmlRpcParser {
    constructor() {
    }

    public parseXml(xml: string): any {
        let resultObject: {
            methodResponse: {
                params?: any[]
                fault?: any[]
            }
        };

        xml2js.parseString(xml, function (error: string, result: any) {
            if (error !== null) {
                throw new Error(error);
            }

            resultObject = result;
        });

        if (resultObject.methodResponse.hasOwnProperty('fault')) {
            return this.parseValue(resultObject.methodResponse.fault[0].value[0]);
        }

        if (resultObject.methodResponse.params.length === 0 || resultObject.methodResponse.params.length > 1) {
            throw new Error('Invalid xml rpc');
        }

        return this.parseValue(resultObject.methodResponse.params[0].param[0].value[0]);
    }

    private parseValue(value: any): any {
        const valueKey = Object.keys(value)[0];
        if (Object.values(ScalarValues).includes(valueKey as ScalarValues)) {
            return this.parseScalarValue(value)
        }

        if (valueKey === ObjectValues.STRUCT) {
            return this.parseStruct(value);
        }

        if (valueKey === ObjectValues.ARRAY) {
            return this.parseArray(value);
        }
    }


    private parseScalarValue(value: any): string | number | boolean {
        const valueKey = Object.keys(value)[0];
        if (valueKey === ScalarValues.INT) {
            return Number(value[valueKey][0]);
        }

        if (valueKey === ScalarValues.STRING) {
            return String(value[valueKey][0]);
        }

        if (valueKey === ScalarValues.BOOLEAN) {
            return value[valueKey][0] === '1';
        }

        return value[valueKey][0];
    }

    private parseStruct(value: any): object {
        const resultObject: any = {};
        for (const member of value.struct[0].member) {
            resultObject[member.name[0]] = this.parseValue(member.value[0]);
        }

        return resultObject;
    }

    private parseArray(value: any): object[] {
        const resultArray: object[] = [];

        for (const arrayValue of value.array[0].data[0].value) {
            resultArray.push(this.parseValue(arrayValue));
        }

        return resultArray;
    }
}