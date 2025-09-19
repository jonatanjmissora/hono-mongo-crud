import mongoose from "mongoose"

export const dbConnect = async () => {
    const uri = String(process.env.MONGODB_URI);
    const db = String(process.env.MONGODB_DB);
    await mongoose.connect(uri, {
        dbName: db
    })
}

export const getDb = () => {
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database not initialized');
    return db;
  };
