import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'; 
import { logger } from 'hono/logger';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/note-controllers.js';

const appNotes = new Hono().basePath('/notes')
appNotes.use(poweredBy())
appNotes.use(logger())

appNotes.get('/', (c) => getAllNotes(c))
appNotes.get('/:id', (c) => getNoteById(c))
appNotes.post("/", (c) => createNote(c))
appNotes.patch('/:id', (c) => updateNote(c))
appNotes.delete('/:id', (c) => deleteNote(c))

appNotes.onError((err, c) => c.text(`Error: ${err.message}`, 500))

export default appNotes
