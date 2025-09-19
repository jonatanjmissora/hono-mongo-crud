import mongoose, { Model, Schema, Types } from "mongoose";

export interface NoteType {
    title: string;
    content: string;
    author?: string;
    pinned?: boolean;
}

export interface NoteLean extends NoteType {
    _id: Types.ObjectId;
}

export const NoteSchema = new Schema<NoteType>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: false },
    pinned: { type: Boolean, default: false },
}, { collection: 'notes', versionKey: false })

// Evitar recompilar el modelo en hot-reload
const NoteModel: Model<NoteType> =
  (mongoose.models.Note as Model<NoteType>) || mongoose.model<NoteType>('Note', NoteSchema, 'notes')

export default NoteModel