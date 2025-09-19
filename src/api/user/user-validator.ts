import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const schemaUser = z.object({
    username: z.string().min(1),
    userpassword: z.string().min(1),
})

export const zUserValidator = zValidator("json", schemaUser)