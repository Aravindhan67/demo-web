import { FiCheckCircle, FiCompass, FiMessageCircle, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';
import type { ServiceDetailDefinition } from './serviceDetails';
import type { ServiceDefinition } from './services';

export function buildGenericServiceDetail(service: ServiceDefinition): ServiceDetailDefinition {
  return {
    path: service.path,
    heroStatement: service.tagline,
    deliverablesTitle: `What ${service.title} can include`,
    deliverablesIntro: `A focused engagement shaped around your goals, priorities, and the outcomes that matter to your business.`,
    deliverables: service.capabilities.map((capability, index) => ({
      title: capability,
      description: `${capability} delivered as part of a practical ${service.title} engagement.`,
      Icon: [FiTarget, FiCompass, FiCheckCircle][index % 3]
    })),
    process: [
      { title: 'Discover', description: 'Clarify the goals, audience, priorities, and constraints.' },
      { title: 'Plan', description: 'Turn the brief into a focused roadmap with clear outcomes.' },
      { title: 'Deliver', description: 'Create, review, and complete the agreed work in visible stages.' },
      { title: 'Improve', description: 'Measure the result and identify the next useful improvements.' }
    ],
    benefits: [
      { title: 'Focused direction', description: 'Work stays connected to the outcome you need.', Icon: FiTarget },
      { title: 'Collaborative delivery', description: 'Clear communication and visible progress throughout.', Icon: FiUsers },
      { title: 'Practical outcomes', description: 'Useful deliverables prepared for real-world use.', Icon: FiTrendingUp },
      { title: 'Ongoing support', description: 'A dependable team available beyond delivery.', Icon: FiMessageCircle }
    ],
    relatedPaths: [],
    ctaTitle: `Ready to discuss ${service.title}?`,
    ctaText: 'Tell us what you are trying to achieve and we will shape a practical way forward.',
    ctaLabel: `Discuss ${service.title}`
  };
}
