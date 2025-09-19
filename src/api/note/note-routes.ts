import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'; 
import { logger } from 'hono/logger';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from './note-controllers.js';
import { zNoteValidator } from './note-validator.js';
import { authToken } from '../../middleware/auth-token.js';

const appNotes = new Hono().basePath('/notes')
appNotes.use(poweredBy())
appNotes.use(logger())

appNotes.get('/', (c) => getAllNotes(c))
appNotes.get('/:id', (c) => getNoteById(c))
appNotes.post("/", authToken, zNoteValidator, (c) => createNote(c))
appNotes.patch('/:id', authToken, zNoteValidator, (c) => updateNote(c))
appNotes.delete('/:id', authToken, (c) => deleteNote(c))

appNotes.onError((err, c) => c.text(`Error: ${err.message}`, 500))

export default appNotes
