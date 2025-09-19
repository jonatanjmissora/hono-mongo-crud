import mongoose, { Model, Schema, Types } from "mongoose";

export interface UserType {
    username: string;
    userpassword: string;
}

export interface UserLean extends UserType {
    _id: Types.ObjectId;
}

export const UserSchema = new Schema<UserType>({
    username: { type: String, required: true },
    userpassword: { type: String, required: true },
}, { collection: 'users', versionKey: false })

// Evitar recompilar el modelo en hot-reload
const UserModel: Model<UserType> =
  (mongoose.models.User as Model<UserType>) || mongoose.model<UserType>('User', UserSchema, 'users')

export default UserModel