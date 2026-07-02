import mongoose from '../server/node_modules/mongoose/index.js';
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
import Program from '../server/models/Program.js';
import { connectDB } from './connection.js';

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing database...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    await Service.deleteMany({});
    await Program.deleteMany({});
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
      { title: 'Gym', industry: 'Fitness', category: 'development', description: 'Gym project', projectUrl: 'https://gym-ten-sandy.vercel.app/', thumbnailImage: 'portfolio-visual-gym' },
      { title: 'Travel Agency', industry: 'Travel', category: 'development', description: 'Travel Agency project', projectUrl: 'https://travel-agency-livid-delta.vercel.app/', thumbnailImage: 'portfolio-visual-travel' },
      { title: 'Real Estate', industry: 'Property', category: 'development', description: 'Real Estate project', projectUrl: 'https://real-estate-delta-lake.vercel.app/', thumbnailImage: 'portfolio-visual-estate' },
      { title: 'Chartered Accountants', industry: 'Professional services', category: 'development', description: 'Chartered Accountants project', projectUrl: 'https://chartered-accountant-website-opal.vercel.app/', thumbnailImage: 'portfolio-visual-accountants' },
      { title: 'TM Brand Identity', industry: 'Corporate', category: 'logo', description: 'TM Brand Identity', projectUrl: '/logos/1.webp', thumbnailImage: '/logos/1.webp' },
      { title: 'Kidhev Logo', industry: 'Healthcare', category: 'logo', description: 'Kidhev Logo', projectUrl: '/logos/2.webp', thumbnailImage: '/logos/2.webp' },
      { title: 'Ww- Design', industry: 'Creative', category: 'logo', description: 'Ww- Design', projectUrl: '/logos/3.webp', thumbnailImage: '/logos/3.webp' },
      { title: 'GOTFYD Branding', industry: 'Marketing', category: 'logo', description: 'GOTFYD Branding', projectUrl: '/logos/4.webp', thumbnailImage: '/logos/4.webp' },
      { title: 'Toilal ELE Logo', industry: 'Industrial', category: 'logo', description: 'Toilal ELE Logo', projectUrl: '/logos/5.webp', thumbnailImage: '/logos/5.webp' },
      { title: 'Uunet Wordmark', industry: 'Technology', category: 'logo', description: 'Uunet Wordmark', projectUrl: '/logos/6.webp', thumbnailImage: '/logos/6.webp' },
      { title: 'HlGA Brand Identity', industry: 'Media', category: 'logo', description: 'HlGA Brand Identity', projectUrl: '/logos/7.webp', thumbnailImage: '/logos/7.webp' },
      { title: 'NM Monogram', industry: 'Creative', category: 'logo', description: 'NM Monogram', projectUrl: '/logos/8.webp', thumbnailImage: '/logos/8.webp' },
      { title: 'Level Up Learning', industry: 'Education', category: 'logo', description: 'Level Up Learning', projectUrl: '/logos/9.webp', thumbnailImage: '/logos/9.webp' },
      { title: 'JAC Creative Brand', industry: 'Services', category: 'logo', description: 'JAC Creative Brand', projectUrl: '/logos/10.webp', thumbnailImage: '/logos/10.webp' },
      { title: 'Lvel Design Logo', industry: 'Wellness', category: 'logo', description: 'Lvel Design Logo', projectUrl: '/logos/11.webp', thumbnailImage: '/logos/11.webp' },
      { title: 'Corporate Emblem', industry: 'Finance', category: 'logo', description: 'Corporate Emblem', projectUrl: '/logos/12.webp', thumbnailImage: '/logos/12.webp' },
      { title: 'Upwork Identity', industry: 'Technology', category: 'logo', description: 'Upwork Identity', projectUrl: '/logos/13.webp', thumbnailImage: '/logos/13.webp' },
      { title: 'VVM Traders', industry: 'Agriculture', category: 'logo', description: 'VVM Traders', projectUrl: '/logos/14.webp', thumbnailImage: '/logos/14.webp' }
    ]);

    console.log('Seeding Programs...');
    await Program.create([
      {
        title: 'Internship Program',
        slug: 'internship',
        kind: 'active',
        launch: 'Open Now',
        description: 'Work alongside our team, develop practical industry skills, and gain professional exposure through real-time digital projects.',
        path: '/programs/internship',
        imageKey: 'internship'
      },
      {
        title: 'Full-Stack Bootcamp',
        slug: 'full-stack-bootcamp',
        kind: 'upcoming',
        launch: 'Launching Q3 2026',
        description: 'A practical pathway covering modern web development from interface to deployment.',
        imageKey: 'full-stack'
      },
      {
        title: 'UI/UX & Graphic Design',
        slug: 'ui-ux-graphic-design',
        kind: 'upcoming',
        launch: 'Launching Q4 2026',
        description: 'Build thoughtful design skills across digital products, brands, and visual systems.',
        imageKey: 'design'
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
      { employeeName: 'John Charles', designation: 'Founder and CEO', email: 'john@jacmedialand.com', profilePhoto: 'john-founder.jpg', featured: true, message: 'Building a team where thoughtful ideas, bold creativity, and dependable execution come together to create work that matters.' },
      { employeeName: 'DHARANIDHRAN P', designation: 'HR & MANAGER', email: 'hr@jacmedialand.com', profilePhoto: 'dharanidhran.png' },
      { employeeName: 'KAPEESH S', designation: 'TEAM LEAD', email: 'kapeesh@jacmedialand.com', profilePhoto: 'kapeesh.png' },
      { employeeName: 'GOWSHIK S', designation: 'DEVELOPER', email: 'gowshik@jacmedialand.com', profilePhoto: 'gowshik.png' },
      { employeeName: 'MOHAN RAJ P', designation: 'UI UX DESIGNER', email: 'mohan@jacmedialand.com', profilePhoto: 'mohan.png' },
      { employeeName: 'SAHAYA STEPHEN S', designation: 'DATA ANALYST', email: 'stephen@jacmedialand.com', profilePhoto: 'stephen.png' },
      { employeeName: 'VINODH T', designation: 'DEVELOPER', email: 'vinodh@jacmedialand.com', profilePhoto: 'vinodh.png' },
      { employeeName: 'MOUNIKA V M', designation: 'SOCIAL MEDIA MANAGER', email: 'mounika@jacmedialand.com', profilePhoto: 'mounika.png' },
      { employeeName: 'Nithya Sree M', designation: 'Social Media Management', email: 'nithya@jacmedialand.com', profilePhoto: 'nithya.png' },
      { employeeName: 'Aswinprabu', designation: 'Digital Marketing', email: 'aswin@jacmedialand.com', profilePhoto: 'aswin.png' },
      { employeeName: 'Mugesh', designation: 'Digital Marketing', email: 'mugesh@jacmedialand.com', profilePhoto: 'mugesh.png' }
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
