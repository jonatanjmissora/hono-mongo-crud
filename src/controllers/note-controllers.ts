import { Context } from "hono";
import { isValidObjectId } from "mongoose";
import NoteModel from "../db/note-model.js";

// GET ALL NOTES
export const getAllNotes = async (c: Context) => {
    const docs = await NoteModel.find().lean().exec();
    const data = docs.map(d => ({ ...d, _id: d._id.toString() }));
    return c.json(data, 200);
}

// GET NOTE BY ID
export const getNoteById = async (c: Context) => {
    const {id} = c.req.param();
    if(!isValidObjectId(id)) return c.json('Id no valido', 400);
    const note = await NoteModel.findById(id).lean( ).exec();
    if(!note) return c.json('Nota no encontrada', 404);
    return c.json(note, 200);
}

// CREATE NOTE
export const createNote = async(c: Context) => {
    const formData = await c.req.json()
    const newNoteObj = new NoteModel(formData)
    try {
      const newNote = await newNoteObj.save()
      console.log("NOTA CREADA : ", newNote)
      return c.json(newNote.toObject(), 201)
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Fallo al crear nota' }, 500)
    }
}

// UPDATE NOTE
export const updateNote = async (c: Context) => {
  const {id} = c.req.param();
  if(!isValidObjectId(id)) return c.json('Id no valido', 400);
  const note = await NoteModel.findById(id).lean( ).exec();
  if(!note) return c.json('Nota no encontrada', 404);
    const formData = await c.req.json()
    try {
      const updatedNote = await NoteModel.findByIdAndUpdate(
        id, 
        formData, 
        {new: true}
      )
      return c.json(updatedNote, 200);
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Fallo al actualizar note' }, 500)
    }
}
  
 // DELETE NOTE
export const deleteNote = async (c: Context) => {
    const {id} = c.req.param();
    if(!isValidObjectId(id)) return c.json('Id no valido', 400);
    const note = await NoteModel.findById(id).lean().exec();
    if(!note) return c.json('Nota no encontrada', 404);
    try {
      await NoteModel.findByIdAndDelete(id)
      return c.json('Nota borrada');
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Fallo al eliminar note' }, 500)
    }
}


// GET ALL NOTES
// export const getAllNotes = async (c: Context) => {

// const db = getDb();
// const col = db.collection('notes');
// const notes = await col.find().toArray() ;

// const docs = await NoteModel.find().exec()
// return c.json(docs.map(doc => doc.toObject()))
//   }

// GET NOTE BY ID
// export const getNoteById = async (c: Context) => {
//   const id = c.req.param('id');
//   if (!ObjectId.isValid(id)) return c.json({ error: 'Invalid id' }, 400);

//   const db = getDb();
//   const col = db.collection('notes');
//   const doc = await col.findOne({ _id: new ObjectId(id) });
//   if (!doc) return c.json({ error: 'Not found' }, 404);

//   return c.json({ ...doc, _id: doc._id.toString() }, 200);
// }

// CREATE NOTE
// export const createNote = async(c: Context) => {
// const CreateNoteSchema = z.object({
//   title: z.string().min(1),
//   content: z.string().min(1),
//   author: z.string().min(1),
//   pinned: z.boolean().optional().default(false),
// }
  
// appNotes.post('/', async (c) => {
//   const body = await c.req.json().catch(() => null);
//   const parsed = CreateNoteSchema.safeParse(body);
//   if (!parsed.success) {
//     return c.json({ errors: parsed.error.flatten() }, 400);
//   }
  
//   const db = getDb();
//   const col = db.collection('notes');
//   const result = await col.insertOne(parsed.data);
//   return c.json({ _id: result.insertedId.toString() }, 201);
// }

// UPDATE NOTE
// export const updateNote = async (c: Context) => {
//   const id = c.req.param('id');
//   if (!ObjectId.isValid(id)) return c.json({ error: 'Invalid id' }, 400);

//   const body = await c.req.json().catch(() => null);
//   const parsed = UpdateNoteSchema.safeParse(body);
//   if (!parsed.success) {
//     return c.json({ errors: parsed.error.flatten() }, 400);
//   }

//   const db = getDb();
//   const col = db.collection('notes');
//   const { value } = await col.findOneAndUpdate(
//     { _id: new ObjectId(id) },
//     { $set: parsed.data },
//     { returnDocument: 'after' }
//   );

//   if (!value) return c.json({ error: 'Not found' }, 404);
//   return c.json({ ...value, _id: value._id.toString() }, 200);
// }

// DELETE NOTE
// export const deleteNote = async (c: Context) => {
//   const id = c.req.param('id');
//   if (!ObjectId.isValid(id)) return c.json({ error: 'Invalid id' }, 400);

//   const db = getDb();
//   const col = db.collection('notes');
//   const { deletedCount } = await col.deleteOne({ _id: new ObjectId(id) });

//   if (!deletedCount) return c.json({ error: 'Not found' }, 404);
//   return c.body(null, 204);
// }

