import { Hono } from "hono"
import { dbConnect } from "./db/mongo-connect.js"
import appNotes from "./routes/index.js"

const app = new Hono()
let status = ""

try {
  await dbConnect()
  console.log('Conectado a mongo db...')
  app.route('/', appNotes)
  status = "Conectado a mongo db  ✔✔✔"
} catch (e) {
  console.error('dbConnect() failed:', e)
  status = `❌❌❌  Error al conectar a mongo db - URI presente: ${process.env.MONGO_URI ? 'Sí' : 'No'}  `
}

const welcome = `
    <div>
      <p>Hello Hono!</p>
      <p>Kato Dev</p>
      <p>${status}</p>
      <a href="/notes">Notes</a>
    </div>
`

app.get('/', (c) => {
  return c.html(welcome)
})

export default app