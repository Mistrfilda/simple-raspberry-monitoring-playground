import * as z from "zod";

export const supervisorStateInfoSchema = z.object({
  statename: z.string(),
  statecode: z.number()
});

export type SupervisorStateInfo = z.infer<typeof supervisorStateInfoSchema>;
