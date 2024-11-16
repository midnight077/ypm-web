import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Unable to find MONGODB_URI environment variable");
}

let cached = global.db;

if (!cached) {
    cached = global.db = {
        mongoose: { conn: null, promise: null },
        mongodb: { promise: null },
    };
}

const db = {
    async connect() {
        if (cached.mongoose.conn) {
            console.log("Reused existing database connection");
            return cached.mongoose.conn;
        }

        if (!cached.mongoose.promise) {
            const opts = {
                bufferCommands: false,
            };

            cached.mongoose.promise = mongoose
                .connect(MONGODB_URI, opts)
                .then((mongoose) => mongoose);

            console.log("Created new database connection");
        }

        try {
            cached.mongoose.conn = await cached.mongoose.promise;
            console.log("Connected to the database");
        } catch (error) {
            cached.mongoose.promise = null;
            console.log(error);
            throw new Error("Unable to connect to the database");
        }

        return cached.mongoose.conn;
    },
    getClient() {
        if (!cached.mongodb.promise) {
            const opts = {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            };

            cached.mongodb.promise = new MongoClient(MONGODB_URI, opts);
        }

        return cached.mongodb.promise;
    },
};

export default db;
