export interface ConfigDefinition {
    appLogFolder?: string;
    testikProperty?: string;
    supervisor: {
        xmlRpc: {
            supervisorXmlRpcBasePath: string
        }
    }
}