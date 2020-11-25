import {SupervisorProcessState} from "../enum/SupervisorProcessState";

// export interface ProcessInfo {
//     name: string;
//     state: SupervisorProcessState;
//     statename: string;
//     description: string;
//     pid: number;
//     stderr_logfile: string | null;
//     stdout_logfile: string | null;
//     stop: number;
//     exitStatus: number;
//     spawnerr: string | null;
//     now: number;
//     group: string;
//     start: number;
// }

import * as z from "zod";

export const processInfoSchema = z.object({
    name: z.string(),
    state: z.nativeEnum(SupervisorProcessState),
    statename: z.string(),
    description: z.string(),
    pid: z.number(),
    stderr_logfile: z.string().nullable(),
    stdout_logfile: z.string().nullable(),
    stop: z.number(),
    exitstatus: z.number(),
    spawnerr: z.string().nullable(),
    now: z.number(),
    group: z.string(),
    start: z.number()
});

export type ProcessInfo = z.infer<typeof processInfoSchema>;