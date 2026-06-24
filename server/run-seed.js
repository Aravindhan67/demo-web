import mongoose from 'mongoose';
import User from './models/User.js';
import Project from './models/Project.js';
import Gallery from './models/Gallery.js';
import Service from './models/Service.js';
import Team from './models/Team.js';
import Blog from './models/Blog.js';
import Testimonial from './models/Testimonial.js';
import Settings from './models/Settings.js';
import Contact from './models/Contact.js';
import Activity from './models/Activity.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected:', mongoose.connection.host);

    console.log('Clearing database...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    await Service.deleteMany({});
    await Team.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await Settings.deleteMany({});
    await Contact.deleteMany({});
    await Activity.deleteMany({});

    console.log('Seeding default Admin...');
    const adminUser = await User.create({
      name: 'Site Administrator',
      email: 'admin@jacmedialand.com',
      password: 'admin'
    });
    console.log(`Admin created: ${adminUser.email} / admin`);

    console.log('Seeding Settings...');
    await Settings.create({
      logoUrl: '',
      faviconUrl: '',
      companyName: 'JAC MediaLand',
      email: 'info@jacmedialand.com',
      phoneNumber: '+1 (555) 123-4567',
      address: '100 Silicon Valley Way, Suite 400, San Jose, CA',
      socialMediaLinks: {
        linkedin: 'https://linkedin.com/company/jacmedialand',
        twitter: 'https://twitter.com/jacmedialand',
        facebook: 'https://facebook.com/jacmedialand',
        instagram: 'https://instagram.com/jacmedialand'
      },
      footerContent: '© 2026 JAC MediaLand. IT Solutions. All rights reserved.'
    });

    console.log('Seeding Initial Activities...');
    await Activity.create([
      { action: 'Database Seeded', description: 'Database was successfully pre-populated with high-quality mock data.' }
    ]);

    console.log('Database seeding completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
