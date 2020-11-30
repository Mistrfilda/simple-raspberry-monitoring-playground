import * as z from "zod";

export interface StartSupervisorProcess {
    success: boolean;
    message?: string;
}

export const startSupervisorProcessError = z.object({
    faultCode: z.number(),
    faultString: z.string(),
});