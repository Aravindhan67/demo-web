import mongoose from 'mongoose';
import Team from './models/Team.js';
import Project from './models/Project.js';
import Service from './models/Service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const fallbackTeamMembers = [
  { slug: 'john-charles', title: 'John Charles', role: 'Founder and CEO', image: 'john-founder.jpg', featured: true, message: 'Building a team where thoughtful ideas, bold creativity, and dependable execution come together to create work that matters.' },
  { slug: 'dharanidhran-p', title: 'DHARANIDHRAN P', role: 'HR & MANAGER', image: 'dharanidhran.png' },
  { slug: 'kapeesh-s', title: 'KAPEESH S', role: 'TEAM LEAD', image: 'kapeesh.png' },
  { slug: 'gowshik-s', title: 'GOWSHIK S', role: 'DEVELOPER', image: 'gowshik.png' },
  { slug: 'mohan-raj-p', title: 'MOHAN RAJ P', role: 'UI UX DESIGNER', image: 'mohan.png' },
  { slug: 'sahaya-stephen-s', title: 'SAHAYA STEPHEN S', role: 'DATA ANALYST', image: 'stephen.png' },
  { slug: 'vinodh-t', title: 'VINODH T', role: 'DEVELOPER', image: 'vinodh.png' },
  { slug: 'mounika-v-m', title: 'MOUNIKA V M', role: 'SOCIAL MEDIA MANAGER', image: 'mounika.png' },
  { slug: 'nithya-sree-m', title: 'Nithya Sree M', role: 'Social Media Management', image: 'nithya.png' },
  { slug: 'aswinprabu', title: 'Aswinprabu', role: 'Digital Marketing', image: 'aswin.png' },
  { slug: 'mugesh', title: 'Mugesh', role: 'Digital Marketing', image: 'mugesh.png' }
];

const fallbackPortfolioProjects = [
  { slug: 'gym', title: 'Gym', industry: 'Fitness', category: 'development', url: 'https://gym-ten-sandy.vercel.app/', visual: 'portfolio-visual-gym' },
  { slug: 'travel-agency', title: 'Travel Agency', industry: 'Travel', category: 'development', url: 'https://travel-agency-livid-delta.vercel.app/', visual: 'portfolio-visual-travel' },
  { slug: 'real-estate', title: 'Real Estate', industry: 'Property', category: 'development', url: 'https://real-estate-delta-lake.vercel.app/', visual: 'portfolio-visual-estate' },
  { slug: 'chartered-accountants', title: 'Chartered Accountants', industry: 'Professional services', category: 'development', url: 'https://chartered-accountant-website-opal.vercel.app/', visual: 'portfolio-visual-accountants' },
  { slug: 'logo-1', title: 'TM Brand Identity', industry: 'Corporate', category: 'logo', url: '/logos/1.webp', visual: '/logos/1.webp' },
  { slug: 'logo-2', title: 'Kidhev Logo', industry: 'Healthcare', category: 'logo', url: '/logos/2.webp', visual: '/logos/2.webp' },
  { slug: 'logo-3', title: 'Ww- Design', industry: 'Creative', category: 'logo', url: '/logos/3.webp', visual: '/logos/3.webp' },
  { slug: 'logo-4', title: 'GOTFYD Branding', industry: 'Marketing', category: 'logo', url: '/logos/4.webp', visual: '/logos/4.webp' },
  { slug: 'logo-5', title: 'Toilal ELE Logo', industry: 'Industrial', category: 'logo', url: '/logos/5.webp', visual: '/logos/5.webp' },
  { slug: 'logo-6', title: 'Uunet Wordmark', industry: 'Technology', category: 'logo', url: '/logos/6.webp', visual: '/logos/6.webp' },
  { slug: 'logo-7', title: 'HlGA Brand Identity', industry: 'Media', category: 'logo', url: '/logos/7.webp', visual: '/logos/7.webp' },
  { slug: 'logo-8', title: 'NM Monogram', industry: 'Creative', category: 'logo', url: '/logos/8.webp', visual: '/logos/8.webp' },
  { slug: 'logo-9', title: 'Level Up Learning', industry: 'Education', category: 'logo', url: '/logos/9.webp', visual: '/logos/9.webp' },
  { slug: 'logo-10', title: 'JAC Creative Brand', industry: 'Services', category: 'logo', url: '/logos/10.webp', visual: '/logos/10.webp' },
  { slug: 'logo-11', title: 'Lvel Design Logo', industry: 'Wellness', category: 'logo', url: '/logos/11.webp', visual: '/logos/11.webp' },
  { slug: 'logo-12', title: 'Corporate Emblem', industry: 'Finance', category: 'logo', url: '/logos/12.webp', visual: '/logos/12.webp' },
  { slug: 'logo-13', title: 'Upwork Identity', industry: 'Technology', category: 'logo', url: '/logos/13.webp', visual: '/logos/13.webp' },
  { slug: 'logo-14', title: 'VVM Traders', industry: 'Agriculture', category: 'logo', url: '/logos/14.webp', visual: '/logos/14.webp' }
];

const services = [
  { title: 'Graphic Design', description: 'We create thoughtful visual identities and brand assets that make businesses recognizable, credible, and ready to grow.', Icon: 'FiPenTool' },
  { title: 'App Development', description: 'We design and build dependable applications that solve real customer problems and support long-term business growth.', Icon: 'FiSmartphone' },
  { title: 'Website Development', description: 'We build responsive websites that combine clear storytelling, dependable engineering, and smooth user experiences.', Icon: 'FiCode' },
  { title: 'SEO Marketing', description: 'We improve search visibility with research-led content, technical optimization, and measurable organic growth strategies.', Icon: 'FiSearch' },
  { title: 'UI / UX Design', description: 'We turn complex product ideas into intuitive interfaces and journeys that feel easy for customers to understand and use.', Icon: 'FiLayers' },
  { title: 'Digital Marketing', description: 'We create focused digital campaigns that strengthen visibility, generate qualified leads, and support sustainable growth.', Icon: 'FiTrendingUp' },
  { title: 'Social Media Management', description: 'We plan content, manage conversations, and grow communities so your brand stays active, consistent, and memorable.', Icon: 'FiUsers', featured: true }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected:', mongoose.connection.host);

    console.log('Seeding Team...');
    for (const member of fallbackTeamMembers) {
      await Team.updateOne(
        { employeeName: member.title },
        {
          $set: {
            employeeName: member.title,
            designation: member.role,
            email: 'info@jacmedialand.com', // fallback
            profilePhoto: member.image,
            featured: member.featured || false,
            message: member.message || ''
          }
        },
        { upsert: true }
      );
    }

    console.log('Seeding Projects...');
    for (const project of fallbackPortfolioProjects) {
      await Project.updateOne(
        { title: project.title },
        {
          $set: {
            title: project.title,
            category: project.category,
            industry: project.industry,
            description: 'Migrated from frontend',
            projectUrl: project.url,
            thumbnailImage: project.visual
          }
        },
        { upsert: true }
      );
    }

    console.log('Seeding Services...');
    for (const service of services) {
      await Service.updateOne(
        { name: service.title },
        {
          $set: {
            name: service.title,
            description: service.description,
            icon: service.Icon
          }
        },
        { upsert: true }
      );
    }

    console.log('Data migration completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error migrating data:', error);
    process.exit(1);
  }
};

seedData();
