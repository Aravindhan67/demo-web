import type { IconType } from 'react-icons';
import type { CmsService } from '../api/contracts';
import {
  FiCode,
  FiLayers,
  FiPenTool,
  FiSearch,
  FiSmartphone,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';

export interface ServiceDefinition {
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  path: string;
  capabilities: string[];
  Icon: IconType;
  featured?: boolean;
}

export const services: ServiceDefinition[] = [
  {
    number: '01',
    title: 'Graphic Design',
    subtitle: 'Brand identity and visual systems',
    tagline: 'Creative designs. Powerful impact.',
    description: 'We create thoughtful visual identities and brand assets that make businesses recognizable, credible, and ready to grow.',
    path: '/services/graphic-design',
    capabilities: ['Brand Identity', 'Campaign Design', 'Creative Systems'],
    Icon: FiPenTool
  },
  {
    number: '02',
    title: 'App Development',
    subtitle: 'Mobile and web applications',
    tagline: 'From idea to useful product.',
    description: 'We design and build dependable applications that solve real customer problems and support long-term business growth.',
    path: '/services/app-development',
    capabilities: ['Mobile Apps', 'Web Apps', 'Product Engineering'],
    Icon: FiSmartphone
  },
  {
    number: '03',
    title: 'Website Development',
    subtitle: 'Fast, modern, conversion-ready websites',
    tagline: 'Built to perform and convert.',
    description: 'We build responsive websites that combine clear storytelling, dependable engineering, and smooth user experiences.',
    path: '/services/website-development',
    capabilities: ['Business Websites', 'E-commerce', 'Performance'],
    Icon: FiCode
  },
  {
    number: '04',
    title: 'SEO Marketing',
    subtitle: 'Search visibility and organic growth',
    tagline: 'Get found by the right audience.',
    description: 'We improve search visibility with research-led content, technical optimization, and measurable organic growth strategies.',
    path: '/services/seo-marketing',
    capabilities: ['Technical SEO', 'Content Strategy', 'Local Search'],
    Icon: FiSearch
  },
  {
    number: '05',
    title: 'UI / UX Design',
    subtitle: 'User-centered digital experiences',
    tagline: 'Clear, intuitive, and useful.',
    description: 'We turn complex product ideas into intuitive interfaces and journeys that feel easy for customers to understand and use.',
    path: '/services/ui-ux-design',
    capabilities: ['UX Research', 'Interface Design', 'Prototyping'],
    Icon: FiLayers
  },
  {
    number: '06',
    title: 'Digital Marketing',
    subtitle: 'Campaigns that connect and convert',
    tagline: 'Smart strategy. Real outcomes.',
    description: 'We create focused digital campaigns that strengthen visibility, generate qualified leads, and support sustainable growth.',
    path: '/services/digital-marketing',
    capabilities: ['Paid Campaigns', 'Lead Generation', 'Analytics'],
    Icon: FiTrendingUp
  },
  {
    number: '07',
    title: 'Social Media Management',
    subtitle: 'Content, community, and brand growth',
    tagline: 'Stay relevant. Build real connection.',
    description: 'We plan content, manage conversations, and grow communities so your brand stays active, consistent, and memorable.',
    path: '/services/social-media',
    capabilities: ['Content Planning', 'Community Management', 'Growth Reporting'],
    Icon: FiUsers,
    featured: true
  }
];

export function mergeCmsServices(cmsServices: CmsService[]): ServiceDefinition[] {
  return cmsServices
    .filter((service) => service.status === 'published')
    .map((cms, index) => {
      const path = `/services/${cms.slug}`;
      const local = services.find((service) => service.path === path);

      return {
        number: String(index + 1).padStart(2, '0'),
        title: nonEmpty(cms.title) ?? local?.title ?? humanizeSlug(cms.slug),
        subtitle: nonEmpty(cms.subtitle) ?? local?.subtitle ?? 'A focused service built around your goals',
        tagline: nonEmpty(cms.tagline) ?? local?.tagline ?? 'Clear strategy. Dependable delivery.',
        description: nonEmpty(cms.description) ?? local?.description ?? `A practical ${humanizeSlug(cms.slug).toLowerCase()} service shaped around your business goals.`,
        path,
        capabilities: validCapabilities(cms.capabilities) ?? local?.capabilities ?? ['Discovery', 'Delivery', 'Ongoing support'],
        Icon: local?.Icon ?? FiCode,
        featured: typeof cms.featured === 'boolean' ? cms.featured : local?.featured
      };
    });
}

function nonEmpty(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function validCapabilities(value?: string[]): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const capabilities = value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim());
  return capabilities.length ? capabilities : undefined;
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}
