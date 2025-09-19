import { Hono } from "hono"
import { dbConnect } from "./db/mongo-connect.js"
import appNotes from "./api/note/note-routes.js"
import appUsers from "./api/user/user-routes.js"
import appAuth from "./api/auth/auth-routes.js"

const app = new Hono()
let status = ""

try {
  await dbConnect()
  console.log('Conectado a mongo db...')
  app.route('/', appNotes)
  app.route('/', appUsers)
  app.route('/', appAuth)
  status = "Conectado a mongo db  ✔"
} catch (e) {
  console.error('dbConnect() failed:', e)
  status = `❌  Error al conectar a mongo db - URI presente: ${process.env.MONGO_URI ? 'Sí' : 'No'}  `
}

const welcome = `
    <div>
      <p>Hello Hono!</p>
      <p>Kato Dev</p>
      <p>${status}</p>
      <a href="/notes">Notes</a>
      <a href="/users">Users</a>
    </div>
`

app.get('/', (c) => {
  return c.html(welcome)
})

export default app