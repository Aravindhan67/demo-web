export interface CmsSectionItem {
  id?: string;
  slug: string;
  title: string;
  status?: 'draft' | 'published' | 'archived';
  sortOrder?: number;
}

export interface HighlightItem extends CmsSectionItem {
  value: string;
}

export interface TeamMemberItem extends CmsSectionItem {
  role: string;
  image?: string;
  featured?: boolean;
  message?: string;
}

export interface PortfolioProjectItem extends CmsSectionItem {
  industry: string;
  category: string;
  url: string;
  visual: string;
}

export interface ProgramItem extends CmsSectionItem {
  kind: 'active' | 'upcoming';
  launch: string;
  description: string;
  path?: string;
  imageKey?: string;
}

export interface CareerOpeningItem extends CmsSectionItem {
  department?: string;
  location: string;
  employmentType: string;
  workplaceType?: string;
  salary?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  closingDate?: string;
  acceptingApplications?: boolean;
  generalApplication?: boolean;
}

export interface ContactItem extends CmsSectionItem {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  city: string;
  responseTime: string;
  heroTitle: string;
  heroDescription: string;
}

export const fallbackHighlights: HighlightItem[] = [
  { slug: 'hours-of-support', title: 'Hours of Support', value: '35,064+' },
  { slug: 'projects', title: 'Projects', value: '2,300+' },
  { slug: 'happy-clients', title: 'Happy Clients', value: '3,000+' },
  { slug: 'smartmates', title: 'SmartMates', value: '30' }
];

export const fallbackTeamMembers: TeamMemberItem[] = [
  {
    slug: 'john-charles',
    title: 'John Charles',
    role: 'Founder and CEO',
    image: 'john-founder.jpg',
    featured: true,
    message: 'Building a team where thoughtful ideas, bold creativity, and dependable execution come together to create work that matters.'
  },
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

export const fallbackPortfolioProjects: PortfolioProjectItem[] = [
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

export const fallbackPrograms: ProgramItem[] = [
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

export const fallbackCareerOpenings: CareerOpeningItem[] = [
  {
    slug: 'talent-network',
    title: 'Apply for Jobs',
    department: 'Future Opportunities',
    location: 'Erode, Tamil Nadu / Flexible',
    employmentType: 'General Application',
    workplaceType: 'Flexible',
    description: 'Tell us what you do well, what you want to learn next, and why JAC MediaLand interests you.',
    responsibilities: ['Share the work you want to do and the problems you enjoy solving.'],
    requirements: ['A thoughtful introduction and examples of relevant work or learning.'],
    benefits: ['Consideration for suitable current and future opportunities.'],
    acceptingApplications: true,
    generalApplication: true
  }
];

export const fallbackContacts: ContactItem[] = [
  {
    slug: 'primary',
    title: 'JAC MediaLand Contact',
    phone: '+91 73388 91367',
    phoneHref: 'tel:+917338891367',
    email: 'jaccreationhouse@gmail.com',
    address: "NGS Complex, Chennimalai Rd, near Erode Art's and Science College, Rangampalayam, Erode, Tamil Nadu 638009",
    city: 'Erode, Tamil Nadu',
    responseTime: 'Response within one business day',
    heroTitle: "Bring us the challenge. We'll help shape the next move.",
    heroDescription: 'Share your goals, current roadblocks, or early idea. Our team will respond with clear next steps and the right mix of expertise.'
  }
];
