import type { IconType } from 'react-icons';
import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiCloud,
  FiCode,
  FiCompass,
  FiCreditCard,
  FiEdit3,
  FiEye,
  FiFileText,
  FiFlag,
  FiGlobe,
  FiGrid,
  FiHeart,
  FiImage,
  FiLayers,
  FiLayout,
  FiLink,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiMousePointer,
  FiPenTool,
  FiPieChart,
  FiRepeat,
  FiSearch,
  FiSettings,
  FiShare2,
  FiShield,
  FiSmartphone,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap
} from 'react-icons/fi';

interface DetailItem {
  title: string;
  description: string;
  Icon: IconType;
}

interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceDetailDefinition {
  path: string;
  heroStatement: string;
  deliverablesTitle: string;
  deliverablesIntro: string;
  deliverables: DetailItem[];
  process: ProcessStep[];
  benefits: DetailItem[];
  relatedPaths: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  technologies?: string[];
}

export const serviceDetails: ServiceDetailDefinition[] = [
  {
    path: '/services/graphic-design',
    heroStatement: 'Designs that speak. Brands that stay remembered.',
    deliverablesTitle: 'What we design',
    deliverablesIntro: 'A practical visual system built to keep your brand clear and recognizable everywhere it appears.',
    deliverables: [
      { title: 'Brand Identity', description: 'Logos, colors, typography, and brand rules that create a coherent identity.', Icon: FiPenTool },
      { title: 'Social Media Creatives', description: 'Platform-ready visual content designed to earn attention and engagement.', Icon: FiShare2 },
      { title: 'Print Design', description: 'Brochures, flyers, banners, catalogs, and physical brand collateral.', Icon: FiFileText },
      { title: 'Campaign Creatives', description: 'Consistent promotional visuals for product launches, offers, and events.', Icon: FiTarget },
      { title: 'Pitch Decks', description: 'Clear, professional presentations that communicate ideas with confidence.', Icon: FiLayout },
      { title: 'Email Templates', description: 'Responsive branded email designs that stand out in busy inboxes.', Icon: FiMail }
    ],
    process: [
      { title: 'Discover', description: 'Understand the brand, audience, context, and communication goal.' },
      { title: 'Define', description: 'Set the visual direction, hierarchy, tone, and creative system.' },
      { title: 'Design', description: 'Create, review, and refine the selected visual direction.' },
      { title: 'Deliver', description: 'Prepare organized, production-ready assets in the formats you need.' }
    ],
    benefits: [
      { title: 'Distinctive creative', description: 'Original visuals shaped around your brand.', Icon: FiZap },
      { title: 'Consistent branding', description: 'One recognizable system across every channel.', Icon: FiRepeat },
      { title: 'Ready in every format', description: 'Assets prepared for digital and print use.', Icon: FiGrid },
      { title: 'Responsive support', description: 'Clear review cycles and dependable delivery.', Icon: FiMessageCircle }
    ],
    relatedPaths: ['/services/ui-ux-design', '/services/social-media', '/services/digital-marketing'],
    ctaTitle: 'Let us turn your ideas into a visual system people remember.',
    ctaText: 'Start with a focused design brief and leave with consistent, useful brand assets.',
    ctaLabel: 'Start a design project'
  },
  {
    path: '/services/app-development',
    heroStatement: 'Powerful, scalable products built around real users.',
    deliverablesTitle: 'What we build',
    deliverablesIntro: 'From product concept to release, we build applications that are dependable, useful, and ready to grow.',
    deliverables: [
      { title: 'User-Centered Interfaces', description: 'Clear, intuitive application journeys designed around real user needs.', Icon: FiLayout },
      { title: 'Secure Architecture', description: 'Reliable foundations and engineering practices that protect product data.', Icon: FiShield },
      { title: 'API Integrations', description: 'Connected payments, services, tools, and third-party platforms.', Icon: FiLink },
      { title: 'Notifications', description: 'Useful push notifications and in-app alerts that support engagement.', Icon: FiBell },
      { title: 'Admin and Analytics', description: 'Practical dashboards that help teams manage and understand the product.', Icon: FiBarChart2 },
      { title: 'Scalable Performance', description: 'Maintainable code and infrastructure prepared for future growth.', Icon: FiCloud }
    ],
    process: [
      { title: 'Product discovery', description: 'Define users, goals, requirements, priorities, and technical constraints.' },
      { title: 'Experience design', description: 'Shape flows, interfaces, prototypes, and the product architecture.' },
      { title: 'Build and validate', description: 'Develop in clear stages with testing, reviews, and visible progress.' },
      { title: 'Launch and support', description: 'Release confidently, monitor performance, and continue improving.' }
    ],
    benefits: [
      { title: 'Clean engineering', description: 'Maintainable code that supports future change.', Icon: FiCode },
      { title: 'Reliable delivery', description: 'Clear milestones and visible project progress.', Icon: FiFlag },
      { title: 'Product thinking', description: 'Decisions guided by users and business outcomes.', Icon: FiCompass },
      { title: 'Ongoing support', description: 'A dependable team after the initial launch.', Icon: FiHeart }
    ],
    relatedPaths: ['/services/ui-ux-design', '/services/website-development', '/services/digital-marketing'],
    ctaTitle: 'Build the next version of your product with a team that thinks beyond code.',
    ctaText: 'Bring us the idea, challenge, or existing product. We will help define the clearest way forward.',
    ctaLabel: 'Discuss your app',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'Flutter', 'PHP', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Nginx', 'Kubernetes']
  },
  {
    path: '/services/website-development',
    heroStatement: 'Fast, clear websites designed to earn trust and convert.',
    deliverablesTitle: 'What we deliver',
    deliverablesIntro: 'A modern website system that communicates clearly, performs smoothly, and supports business growth.',
    deliverables: [
      { title: 'Responsive Websites', description: 'Purposeful layouts that work beautifully across every screen size.', Icon: FiMonitor },
      { title: 'Conversion Journeys', description: 'Clear content hierarchy and calls to action that guide visitors forward.', Icon: FiMousePointer },
      { title: 'Service and Product Pages', description: 'Organized pages that make your offer easy to understand and compare.', Icon: FiGrid },
      { title: 'Business Integrations', description: 'Forms, chat, maps, analytics, and useful connected workflows.', Icon: FiSettings },
      { title: 'Search Foundations', description: 'Technical and content foundations prepared for organic visibility.', Icon: FiSearch },
      { title: 'Performance and Support', description: 'Fast delivery, dependable performance, and ongoing improvement.', Icon: FiActivity }
    ],
    process: [
      { title: 'Clarify the goal', description: 'Define the audience, offer, outcomes, and essential website journeys.' },
      { title: 'Plan the experience', description: 'Shape the sitemap, content hierarchy, wireframes, and visual direction.' },
      { title: 'Build and test', description: 'Develop responsive pages, integrations, and performance foundations.' },
      { title: 'Launch and improve', description: 'Deploy, validate, measure, and support the site after release.' }
    ],
    benefits: [
      { title: 'Built to convert', description: 'Every page supports a clear visitor action.', Icon: FiTarget },
      { title: 'Fast by default', description: 'Performance considered throughout the build.', Icon: FiZap },
      { title: 'Easy to navigate', description: 'Straightforward structure for visitors and teams.', Icon: FiCompass },
      { title: 'Ready to grow', description: 'A dependable foundation for future changes.', Icon: FiTrendingUp }
    ],
    relatedPaths: ['/services/seo-marketing', '/services/ui-ux-design', '/services/digital-marketing'],
    ctaTitle: 'Build a website that works as hard as your business does.',
    ctaText: 'We will help you turn your offer into a clear, credible, conversion-ready digital experience.',
    ctaLabel: 'Plan your website'
  },
  {
    path: '/services/seo-marketing',
    heroStatement: 'Earn visibility where your customers are already searching.',
    deliverablesTitle: 'What we optimize',
    deliverablesIntro: 'A measurable organic growth system built around search intent, technical quality, and useful content.',
    deliverables: [
      { title: 'Keyword Strategy', description: 'Research that connects customer search behavior to useful opportunities.', Icon: FiSearch },
      { title: 'On-Page SEO', description: 'Stronger headings, metadata, structure, and internal linking.', Icon: FiFileText },
      { title: 'Content Optimization', description: 'Useful content improved for both readers and search engines.', Icon: FiEdit3 },
      { title: 'Authority Building', description: 'Relevant, quality links and signals that strengthen domain trust.', Icon: FiLink },
      { title: 'Local Search', description: 'Local visibility improvements that help nearby customers find you.', Icon: FiMapPin },
      { title: 'Reporting and Insights', description: 'Clear reporting that connects rankings, traffic, and business outcomes.', Icon: FiPieChart }
    ],
    process: [
      { title: 'Audit', description: 'Review current visibility, technical health, content, and competitors.' },
      { title: 'Prioritize', description: 'Build a focused roadmap around the highest-value opportunities.' },
      { title: 'Optimize', description: 'Improve technical foundations, content, pages, and authority signals.' },
      { title: 'Measure and refine', description: 'Track meaningful progress and continuously improve the strategy.' }
    ],
    benefits: [
      { title: 'Search-led strategy', description: 'Priorities based on real audience demand.', Icon: FiTarget },
      { title: 'White-hat practice', description: 'Sustainable methods that protect long-term growth.', Icon: FiShield },
      { title: 'Transparent reporting', description: 'Understand what changed and why it matters.', Icon: FiBarChart2 },
      { title: 'Continuous improvement', description: 'Ongoing optimization as search behavior changes.', Icon: FiTrendingUp }
    ],
    relatedPaths: ['/services/website-development', '/services/digital-marketing', '/services/social-media'],
    ctaTitle: 'Find the search opportunities your business is currently missing.',
    ctaText: 'Start with a focused conversation about your website, audience, and organic growth goals.',
    ctaLabel: 'Request an SEO review'
  },
  {
    path: '/services/ui-ux-design',
    heroStatement: 'Turn complex ideas into clear, intuitive experiences.',
    deliverablesTitle: 'What we design',
    deliverablesIntro: 'A user-centered design system that makes products easier to understand, use, build, and improve.',
    deliverables: [
      { title: 'User Research', description: 'Focused discovery that clarifies audience needs, behavior, and context.', Icon: FiUsers },
      { title: 'Flows and Wireframes', description: 'Clear journey planning before visual polish and engineering effort.', Icon: FiCompass },
      { title: 'Interface Design', description: 'Purposeful, polished screens shaped around product goals.', Icon: FiLayout },
      { title: 'Interactive Prototypes', description: 'Clickable experiences that help teams validate ideas early.', Icon: FiMousePointer },
      { title: 'Design Systems', description: 'Reusable components and guidance that maintain visual consistency.', Icon: FiLayers },
      { title: 'Responsive Experiences', description: 'Thoughtful behavior across desktop, tablet, and mobile screens.', Icon: FiSmartphone }
    ],
    process: [
      { title: 'Understand', description: 'Learn the product, users, goals, constraints, and existing evidence.' },
      { title: 'Structure', description: 'Define journeys, information architecture, flows, and wireframes.' },
      { title: 'Design and prototype', description: 'Create polished interfaces and validate important interactions.' },
      { title: 'Handoff and improve', description: 'Support implementation and refine the experience with feedback.' }
    ],
    benefits: [
      { title: 'User-centered choices', description: 'Design decisions grounded in actual needs.', Icon: FiUsers },
      { title: 'Clear product journeys', description: 'Less confusion and fewer unnecessary steps.', Icon: FiCompass },
      { title: 'Consistent interfaces', description: 'Reusable patterns that feel intentional.', Icon: FiGrid },
      { title: 'Engineering-ready', description: 'Practical designs prepared for implementation.', Icon: FiCode }
    ],
    relatedPaths: ['/services/app-development', '/services/website-development', '/services/graphic-design'],
    ctaTitle: 'Design an experience your customers understand without effort.',
    ctaText: 'Bring us a new idea or an existing product that needs clarity, consistency, or better usability.',
    ctaLabel: 'Discuss your experience'
  },
  {
    path: '/services/digital-marketing',
    heroStatement: 'Focused campaigns built to create measurable growth.',
    deliverablesTitle: 'What we activate',
    deliverablesIntro: 'A connected marketing system that reaches the right audience, supports conversion, and improves with evidence.',
    deliverables: [
      { title: 'Campaign Strategy', description: 'Clear audience, channel, message, offer, and measurement planning.', Icon: FiCompass },
      { title: 'Paid Advertising', description: 'Focused Meta and Google campaigns shaped around meaningful outcomes.', Icon: FiCreditCard },
      { title: 'Social Campaigns', description: 'Creative campaigns that strengthen awareness and audience engagement.', Icon: FiShare2 },
      { title: 'WhatsApp Marketing', description: 'Direct, useful customer communication designed around permission and value.', Icon: FiMessageCircle },
      { title: 'Email Marketing', description: 'Lifecycle campaigns that nurture interest and support retention.', Icon: FiMail },
      { title: 'Reporting and Optimization', description: 'Clear performance insights and continuous campaign improvements.', Icon: FiBarChart2 }
    ],
    process: [
      { title: 'Set the outcome', description: 'Define audiences, goals, offers, channels, and success measures.' },
      { title: 'Build the campaign', description: 'Create the message, assets, landing journey, and measurement plan.' },
      { title: 'Launch and learn', description: 'Activate campaigns and gather useful performance evidence.' },
      { title: 'Optimize and scale', description: 'Improve what works and reduce spend that does not create value.' }
    ],
    benefits: [
      { title: 'Outcome focused', description: 'Campaigns tied to meaningful business goals.', Icon: FiTarget },
      { title: 'Connected channels', description: 'A consistent message across the customer journey.', Icon: FiLink },
      { title: 'Visible performance', description: 'Clear reporting without unnecessary noise.', Icon: FiEye },
      { title: 'Continuous optimization', description: 'Evidence guides every improvement.', Icon: FiTrendingUp }
    ],
    relatedPaths: ['/services/social-media', '/services/seo-marketing', '/services/graphic-design'],
    ctaTitle: 'Build a marketing system that turns attention into meaningful action.',
    ctaText: 'We will help identify the right audience, message, channels, and measurement plan.',
    ctaLabel: 'Plan your campaign'
  },
  {
    path: '/services/social-media',
    heroStatement: 'Stay active, relevant, and connected to your audience.',
    deliverablesTitle: 'What we manage',
    deliverablesIntro: 'A consistent social presence built around thoughtful content, responsive community management, and useful reporting.',
    deliverables: [
      { title: 'Content Planning', description: 'A clear monthly calendar shaped around audience and business priorities.', Icon: FiBookOpen },
      { title: 'Creative Production', description: 'Consistent visual posts, stories, reels, and platform-ready content.', Icon: FiImage },
      { title: 'Captions and Publishing', description: 'Useful copy, hashtags, scheduling, and dependable posting rhythms.', Icon: FiEdit3 },
      { title: 'Community Management', description: 'Professional replies and conversations that strengthen audience trust.', Icon: FiMessageCircle },
      { title: 'Platform Management', description: 'Connected management across the social channels that matter most.', Icon: FiGlobe },
      { title: 'Performance Reporting', description: 'Clear insights into reach, engagement, growth, and next actions.', Icon: FiBarChart2 }
    ],
    process: [
      { title: 'Set the direction', description: 'Define audience, voice, content themes, platforms, and goals.' },
      { title: 'Plan and create', description: 'Build the content calendar, visuals, copy, and approval flow.' },
      { title: 'Publish and engage', description: 'Maintain a reliable presence and respond to the community.' },
      { title: 'Review and improve', description: 'Use performance evidence to strengthen the next content cycle.' }
    ],
    benefits: [
      { title: 'Consistent presence', description: 'Your audience sees an active, dependable brand.', Icon: FiRepeat },
      { title: 'Stronger engagement', description: 'Content and replies encourage real connection.', Icon: FiUsers },
      { title: 'Better visibility', description: 'Thoughtful publishing improves brand recognition.', Icon: FiEye },
      { title: 'Measurable progress', description: 'Regular reports guide practical improvements.', Icon: FiBarChart2 }
    ],
    relatedPaths: ['/services/digital-marketing', '/services/graphic-design', '/services/seo-marketing'],
    ctaTitle: 'Build a social presence your audience wants to follow.',
    ctaText: 'We will help create the plan, content, rhythm, and reporting system your brand needs.',
    ctaLabel: 'Plan your social presence'
  }
];
