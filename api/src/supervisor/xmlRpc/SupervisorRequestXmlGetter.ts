import {SupervisorXmlRpcMethod} from "./enum/SupervisorXmlMethods";

export function getRequestXml(method: SupervisorXmlRpcMethod): string {
    return '<?xml version="1.0"?><methodCall><methodName>supervisor.'
        + method +
        '</methodName></methodCall>';
}

export function getRequestXmlWithParam(method: SupervisorXmlRpcMethod, param: string): string {
    return '<?xml version="1.0"?><methodCall><methodName>supervisor.'
        + method + '</methodName><params><param><value><string>'
        + param + '</string></value></param></params></methodCall>';
}