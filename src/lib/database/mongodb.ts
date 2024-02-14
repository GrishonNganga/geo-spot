// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
    namespace globalThis {
        var mongoose: any
    }
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    let retries = 3;
    while (retries > 0) {
        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
                return mongoose;
            });
        }
        try {
            cached.conn = await cached.promise;
        } catch (e) {
            retries--;
            if (retries === 0) {
                console.log("SOME", e)
                return null
            } else {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Add a delay before retrying
            }

        }
        return cached.conn;
    }
}

export default dbConnect;