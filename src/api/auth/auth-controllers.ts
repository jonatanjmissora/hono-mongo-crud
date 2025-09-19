import { Context } from "hono";
import UserModel from "../user/user-model.js";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

// GET TOKEN
export const authLogin = async (c: Context) => {
  try {
    const {username, userpassword} = await c.req.json()
    const user = await UserModel.findOne({username})
    if(!user) return c.json({ success: false, message: 'Usuario no registrado' }, 404)
    const isPasswordValid = await bcrypt.compare(userpassword, user.userpassword)
    if(!isPasswordValid) return c.json({ success: false, error: 'Contraseña incorrecta' }, 401)

    const payload = {
      username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1
    }

    const token = await sign(payload, process.env.JWT_SECRET || "secret")
    return c.json({success: true, token}, 200);
   } catch (error) {
       console.error(error)
        return c.json({ error: 'Fallo al loguear usuario' }, 500)
      }
}