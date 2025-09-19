import { Hono } from "hono"
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { authLogin } from "./auth-controllers.js";

const appAuth = new Hono().basePath('/auth')
appAuth.use(poweredBy())
appAuth.use(logger())

appAuth.post('/login', (c) => authLogin(c))

export default appAuth