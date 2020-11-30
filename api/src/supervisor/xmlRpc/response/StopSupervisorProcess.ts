import * as z from "zod";

export interface StopSupervisorProcess {
    success: boolean;
    message?: string;
}

export const stopSupervisorProcessError = z.object({
    faultCode: z.number(),
    faultString: z.string(),
});