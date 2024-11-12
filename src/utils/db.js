import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Unable to find MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const db = {
    async connect() {
        if (cached.conn) {
            console.log("Reused existing database connection");
            return cached.conn;
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };

            cached.promise = mongoose
                .connect(MONGODB_URI, opts)
                .then((mongoose) => mongoose);

            console.log("Created new database connection");
        }

        try {
            cached.conn = await cached.promise;
            console.log("Connected to the database");
        } catch (error) {
            cached.promise = null;
            console.log(error);
            throw new Error("Unable to connect to the database");
        }

        return cached.conn;
    },
};

export default db;
