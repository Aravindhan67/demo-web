import mongoose from 'mongoose';
import User from '../server/models/User.js';
import Project from '../server/models/Project.js';
import Gallery from '../server/models/Gallery.js';
import Service from '../server/models/Service.js';
import Team from '../server/models/Team.js';
import Blog from '../server/models/Blog.js';
import Testimonial from '../server/models/Testimonial.js';
import Settings from '../server/models/Settings.js';
import Contact from '../server/models/Contact.js';
import Activity from '../server/models/Activity.js';
import { connectDB } from './connection.js';

const seedData = async () => {
  try {
    await connectDB();

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
      password: 'admin' // Pre-save hook will hash this
    });
    console.log(`Admin created: ${adminUser.email} / admin`);

    console.log('Seeding Projects...');
    await Project.create([
      {
        title: 'JAC MediaLand Website Redesign',
        category: 'Web Development',
        description: 'A complete redesign and migration of JAC MediaLand brand site to a highly responsive, modern glassmorphic interface.',
        clientName: 'JAC MediaLand Group',
        projectDate: new Date('2026-05-15'),
        status: 'Completed',
        technologiesUsed: ['React', 'TypeScript', 'Styled Components', 'Vite'],
        thumbnailImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80'
        ],
        projectUrl: 'https://jacmedialand.com'
      },
      {
        title: 'E-Commerce Platform for Fashion Retailer',
        category: 'App Development',
        description: 'Scalable mobile-first commerce experience featuring fast checkouts, live catalog searches, and robust inventory management integrations.',
        clientName: 'Vogue Boutique',
        projectDate: new Date('2026-04-10'),
        status: 'In Progress',
        technologiesUsed: ['React Native', 'Node.js', 'Express', 'MongoDB'],
        thumbnailImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
        galleryImages: [],
        projectUrl: ''
      }
    ]);

    console.log('Seeding Services...');
    await Service.create([
      {
        name: 'Graphic Design',
        icon: 'FaPaintBrush',
        description: 'Crafting stunning brand identities, vector illustrations, promotional banners, and marketing collaterals.'
      },
      {
        name: 'Website Development',
        icon: 'FaCode',
        description: 'Developing blazing-fast, responsive web applications using the latest web technologies and performance tools.'
      },
      {
        name: 'Digital Marketing',
        icon: 'FaBullhorn',
        description: 'Expanding your reach using SEO, targeted ads, content generation, and smart marketing funnels.'
      }
    ]);

    console.log('Seeding Team...');
    await Team.create([
      {
        employeeName: 'Jane Doe',
        designation: 'Managing Director & Founder',
        email: 'jane@jacmedialand.com',
        mobileNumber: '+1 234 567 890',
        joiningDate: new Date('2024-01-15'),
        profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
        socialMediaLinks: {
          linkedin: 'https://linkedin.com/in/janedoe',
          twitter: 'https://twitter.com/janedoe',
          github: ''
        }
      },
      {
        employeeName: 'John Smith',
        designation: 'Lead Frontend Architect',
        email: 'john@jacmedialand.com',
        mobileNumber: '+1 987 654 321',
        joiningDate: new Date('2025-06-01'),
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
        socialMediaLinks: {
          linkedin: 'https://linkedin.com/in/johnsmith',
          github: 'https://github.com/johnsmith'
        }
      }
    ]);

    console.log('Seeding Gallery...');
    await Gallery.create([
      {
        photoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        title: 'Developer Workspace Setup',
        description: 'A sneak peek into our collaborative development environment featuring multiple high-refresh monitors and mechanic keyboards.'
      },
      {
        photoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        title: 'Creative Brainstorming Session',
        description: 'Our design and UI/UX team laying out wireframes for our upcoming web platform project.'
      }
    ]);

    console.log('Seeding Blogs...');
    await Blog.create([
      {
        title: 'Mastering Styled Components in 2026',
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        category: 'Design & Code',
        author: 'John Smith',
        description: 'A deep-dive tutorial explaining modern design systems, clean CSS architecture, and advanced styled-components strategies in React 19.',
        publishDate: new Date('2026-06-20'),
        status: 'Published'
      },
      {
        title: 'Leveraging Headless CMS Architecture for Speed',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        category: 'Technology',
        author: 'Jane Doe',
        description: 'Why decouped frontends and headless backend CMS portals are dominating modern web design and driving faster SEO scores.',
        publishDate: new Date('2026-06-24'),
        status: 'Draft'
      }
    ]);

    console.log('Seeding Testimonials...');
    await Testimonial.create([
      {
        clientName: 'Marcus Aurelius',
        companyName: 'Meditation Apps Ltd',
        feedback: 'The team at JAC MediaLand exceeded our expectations. They redesigned our interface, dramatically improved our performance scores, and simplified our administration workflow.',
        rating: 5,
        clientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
      }
    ]);

    console.log('Seeding Contact Enquiries...');
    await Contact.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        mobileNumber: '555-123-4567',
        subject: 'Inquiry for Web Design Project',
        message: 'Hello, I represent a startup looking to redesign our corporate landing page. We love the glassmorphic styling on your portfolio. Could you provide a rough estimate?',
        createdAt: new Date('2026-06-23T14:30:00Z')
      },
      {
        name: 'Bob Miller',
        email: 'bob@example.com',
        mobileNumber: '555-987-6543',
        subject: 'Partnership Opportunity',
        message: 'Hi team, I would love to explore potential agency partnership opportunities with JAC MediaLand. We specialize in custom illustrations that could complement your designs.',
        createdAt: new Date('2026-06-24T08:15:00Z')
      }
    ]);

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
