import mongoose from 'mongoose';
import Program from './models/Program.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const fallbackPrograms = [
  {
    slug: 'internship',
    title: 'Internship Program',
    kind: 'active',
    launch: 'Open Now',
    description: 'Work alongside our team, develop practical industry skills, and gain professional exposure through real-time digital projects.',
    path: '/programs/internship',
    imageKey: 'internship'
  },
  {
    slug: 'full-stack-bootcamp',
    title: 'Full-Stack Bootcamp',
    kind: 'upcoming',
    launch: 'Launching Q3 2026',
    description: 'A practical pathway covering modern web development from interface to deployment.',
    imageKey: 'full-stack'
  },
  {
    slug: 'ui-ux-graphic-design',
    title: 'UI/UX & Graphic Design',
    kind: 'upcoming',
    launch: 'Launching Q4 2026',
    description: 'Build thoughtful design skills across digital products, brands, and visual systems.',
    imageKey: 'design'
  }
];

const seedPrograms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected:', mongoose.connection.host);

    console.log('Clearing old programs...');
    await Program.deleteMany({});

    console.log('Inserting programs...');
    await Program.insertMany(fallbackPrograms);

    console.log('Programs seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding programs:', error);
    process.exit(1);
  }
};

seedPrograms();
