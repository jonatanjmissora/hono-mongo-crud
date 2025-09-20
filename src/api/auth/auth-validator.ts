import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const schemaAuth = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export const zAuthValidator = zValidator("json", schemaAuth)