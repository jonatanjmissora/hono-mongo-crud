import { verify } from "hono/jwt";
import { Context, Next } from "hono";

export const authToken = async (c:Context, next:Next) => {
    try {
        const token = c.req.header('Authorization')
        if(!token) return c.json({error: 'Token no encontrado'}, 401)

        await verify(token, process.env.JWT_SECRET || 'secret')
        await next()
    }
    catch (error) {
        console.error(error)
        return c.json({error: 'Fallo al verificar token'}, 500)
    }

}