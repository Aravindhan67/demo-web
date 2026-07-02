import mongoose from '../server/node_modules/mongoose/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export async function connectDB() {
  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`Database Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    process.exit(1);
  }
}
