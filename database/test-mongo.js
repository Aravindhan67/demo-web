import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  const uri = process.env.MONGODB_URI;
  console.log('Connecting to:', uri.replace(/:([^:@]{3,})@/, ':***@')); // Hide password

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db('JAC_website');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    console.log('Testing write operation...');
    const result = await db.collection('users').deleteMany({ name: 'TestUserToDelete' });
    console.log('Write operation success:', result);
    
  } catch (err) {
    console.error('Mongo Error Details:', err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
