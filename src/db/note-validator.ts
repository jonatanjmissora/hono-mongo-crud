import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const schemaNote = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    pinned: z.boolean().optional().default(false),
})

export const zNoteValidator = zValidator("json", schemaNote)