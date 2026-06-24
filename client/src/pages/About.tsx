import ScrollReveal from '../components/ScrollReveal';
import johnFounderImg from '../assets/john-founder.jpg';
import logoImageDark from '../assets/websitelogo_dark.webp';
import { useCmsCollection } from '../api/useCmsCollection';
import { fallbackTeamMembers, type TeamMemberItem } from '../data/cmsSections';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiCompass,
  FiEdit3,
  FiHeart,
  FiMonitor,
  FiSend,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import { CultureIllustration } from '../components/Illustrations.tsx';
import { teamMemberImageUrl } from '../utils/cloudinary';

import { buildCmsUrl } from '../api/cmsClient';

function getMemberImageUrl(image: string | undefined): string | null {
  if (!image) return null;
  if (image.startsWith('/uploads')) return buildCmsUrl(image);
  if (image.startsWith('http')) return image;
  if (image.startsWith('team/')) return teamMemberImageUrl(image, 320);
  return `${import.meta.env.BASE_URL}team/${image}`;
}

function getFounderImageUrl(image: string | undefined): string {
  if (!image) return johnFounderImg;
  if (image.startsWith('/uploads')) return buildCmsUrl(image);
  if (image.startsWith('http')) return image;
  if (image.startsWith('team/')) return teamMemberImageUrl(image, 600);
  if (image.includes('john-founder')) return johnFounderImg;
  return `${import.meta.env.BASE_URL}team/${image}`;
}

export default function About() {
  const teamMembers = useCmsCollection<TeamMemberItem>('teamMembers', fallbackTeamMembers);
  const founder = teamMembers.find((member) => member.featured) ?? teamMembers[0] ?? fallbackTeamMembers[0];
  const team = teamMembers.filter((member) => !member.featured);

  return (
    <main className="page abp-page" style={{ display: 'block' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="abp-hero">
        <div className="abp-hero-container">
          <div className="abp-hero-left">
            <ScrollReveal direction="up" delay={65}>
              <span className="abp-badge">
                <span className="abp-badge-dot" />
                About JAC MediaLand
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              <h1 className="abp-hero-title">
                Learn About <span className="abp-hero-title-accent">Us.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={180}>
              <p className="abp-hero-lead">
                A youth-powered creative and technology company building thoughtful digital experiences with clarity, precision, and purpose.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div className="abp-story">
                <p>JAC MediaLand upholds a high standard of excellence in building meaningful and dependable solutions in India.</p>
                <p>Whether you're launching from the ground up or aiming to elevate an existing venture, we infuse every project with fresh perspective and strategic excellence.</p>
                <p>Our team is made up of level-headed problem solvers, steady under pressure, solution-oriented, and fully committed to bringing your vision to life with clarity and precision.</p>
                <p>We're more than just a tech company! We're a youth-powered culture, driven by deep expertise, bold creativity, and a relentless passion for shaping what's next.</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={200} className="abp-hero-right">
            {/* Branded Logo Card */}
            <div className="abp-logo-card">
              <div className="abp-logo-card-inner">
                {/* Top badge */}
                <div className="abp-logo-card-badge">
                  <span className="abp-logo-card-dot" />
                  Est. 2022
                </div>

                {/* Logo lockup */}
                <div className="abp-logo-lockup">
                  <img
                    src={logoImageDark}
                    alt="JAC MediaLand Logo"
                    className="abp-logo-img"
                  />
                  <div className="abp-logo-text-group">
                    <span className="abp-logo-brand">JAC MediaLand</span>
                    <span className="abp-logo-tagline">IT Solutions</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="abp-logo-divider" />

                {/* Description */}
                <p className="abp-logo-desc">
                  A youth-powered creative & technology company building thoughtful digital experiences with clarity and purpose.
                </p>

                {/* Stat pills */}
                <div className="abp-logo-stats">
                  <div className="abp-logo-stat">
                    <span className="abp-logo-stat-num">50+</span>
                    <span className="abp-logo-stat-label">Projects</span>
                  </div>
                  <div className="abp-logo-stat">
                    <span className="abp-logo-stat-num">3+</span>
                    <span className="abp-logo-stat-label">Years</span>
                  </div>
                  <div className="abp-logo-stat">
                    <span className="abp-logo-stat-num">100%</span>
                    <span className="abp-logo-stat-label">Committed</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="abp-logo-grid" aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative background grid lines */}
        <div className="abp-hero-grid" aria-hidden="true" />
      </section>

      {/* ── LIFE AT JAC ───────────────────────────────────────── */}
      <section className="abp-life-section">
        <div className="abp-life-container">
          <ScrollReveal direction="right" delay={100} className="abp-life-visual">
            <div className="abp-life-illustration-wrap">
              <CultureIllustration />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={180} className="abp-life-copy">
            <span className="abp-label">Life at JAC</span>
            <h2 className="abp-life-title">Life at JAC MediaLand</h2>
            <div className="abp-life-sub">
              A workplace where curiosity is encouraged, people feel supported, and passion fuels progress.
            </div>

            <p className="abp-life-text">
              At JAC MediaLand, we believe that great innovation thrives in a positive and collaborative environment. Our culture is built on the foundation of mutual respect, continuous learning, and creative freedom. We nurture a healthy ecosystem where ideas are encouraged, individuality is celebrated, and every voice is heard.
            </p>
            <p className="abp-life-text">
              We are not just building technology — we are building a community of forward-thinkers driven by curiosity and purpose. With an open-door policy, flexible thinking, and a strong focus on work-life balance, JAC MediaLand is a place where careers flourish, friendships grow, and innovation never stops.
            </p>

            <div className="abp-life-values">
              {[
                { label: 'Creative Freedom', icon: FiZap },
                { label: 'Continuous Learning', icon: FiBookOpen },
                { label: 'People First', icon: FiHeart },
                { label: 'Shared Ideas', icon: FiUsers }
              ].map((value) => (
                <div className="abp-life-value" key={value.label}>
                  <span className="abp-life-value-icon" aria-hidden="true">
                    <value.icon size={18} />
                  </span>
                  <strong>{value.label}</strong>
                  <span className="abp-life-value-check"><FiCheck size={12} /></span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="abp-process-section">
        <div className="abp-process-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="abp-section-head">
              <span className="abp-label">Our Process</span>
              <h2 className="abp-process-title">How We Work</h2>
              <p className="abp-process-subtitle">
                A clear, collaborative path that turns your ideas into dependable digital experiences.
              </p>
            </div>
          </ScrollReveal>

          <div className="abp-process-grid">
            {[
              { num: '01', label: 'Understand Your Goals', desc: 'We listen closely, clarify your needs, and define what success looks like.', icon: FiTarget },
              { num: '02', label: 'Plan the Right Approach', desc: 'We shape a practical strategy with clear priorities, scope, and direction.', icon: FiCompass },
              { num: '03', label: 'Create and Collaborate', desc: 'We design, build, and refine the solution with your feedback throughout.', icon: FiEdit3 },
              { num: '04', label: 'Launch and Support', desc: 'We deliver confidently and stay available as your business continues to grow.', icon: FiSend }
            ].map((step, idx) => (
              <ScrollReveal key={step.label} direction="up" delay={idx * 80}>
                <article className="abp-process-card">
                  <div className="abp-process-card-top">
                    <span className="abp-process-num">{step.num}</span>
                    <span className="abp-process-icon-wrap" aria-hidden="true">
                      <step.icon size={22} />
                    </span>
                  </div>
                  <h3 className="abp-process-card-title">{step.label}</h3>
                  <p className="abp-process-card-desc">{step.desc}</p>
                  <div className="abp-process-card-footer">
                    <span className="abp-process-arrow">→</span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="abp-team-section">
        <div className="abp-team-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="abp-section-head text-center">
              <span className="abp-label">Leadership & Team</span>
              <h2>People Behind Our Success</h2>
              <p className="mx-auto">
                Purposeful leadership and a committed team working together to create meaningful digital experiences.
              </p>
            </div>
          </ScrollReveal>

          {/* Founder Spotlight */}
          <ScrollReveal direction="up" delay={120}>
            <article className="founder-spotlight">
              <div className="founder-photo-wrap">
                <img
                  src={getFounderImageUrl(founder.image)}
                  alt={`${founder.title}, Founder and CEO of JAC MediaLand`}
                  className="founder-photo"
                />
                <span className="founder-photo-label">Founder Spotlight</span>
              </div>
              <div className="founder-content">
                <span className="founder-badge">
                  <FiAward aria-hidden="true" size={13} />
                  Founder & CEO
                </span>
                <p className="founder-eyebrow">Leading the vision behind JAC MediaLand</p>
                <h3>{founder.title}</h3>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-message">"{founder.message}"</p>
                <div className="founder-signature" aria-hidden="true">
                  <span />
                  <strong>JAC MediaLand</strong>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Team Grid Heading */}
          <div className="abp-team-grid-heading">
            <div>
              <span className="abp-label">Our Team</span>
              <h3>Meet the people who make it happen.</h3>
            </div>
            <p>Different strengths, one shared commitment to excellent work.</p>
          </div>

          {/* Team Grid */}
          <div className="abp-team-grid">
            {team.map((member, idx) => (
              <ScrollReveal key={member.slug} direction="up" delay={(idx % 4) * 60}>
                <div className="abp-team-card">
                  <div className="abp-team-card-inner">
                    {member.image && getMemberImageUrl(member.image) ? (
                      <img
                        src={getMemberImageUrl(member.image) || ''}
                        alt={member.title}
                        className="abp-team-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="abp-team-placeholder">
                        <FiUser className="abp-team-placeholder-icon" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="abp-team-card-copy">
                    <div className="abp-team-name">{member.title}</div>
                    <div className="abp-team-role">{member.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPACE ─────────────────────────────────────────────── */}
      <section className="abp-space-section">
        <div className="abp-space-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="abp-section-head">
              <span className="abp-label">Inside JAC MediaLand</span>
              <h2>Our Space</h2>
              <p>A creative environment designed for focused thinking, open collaboration, and meaningful progress.</p>
            </div>
          </ScrollReveal>

          <div className="abp-space-showcase">
            <ScrollReveal direction="right" delay={120} className="abp-space-visual">
              <div className="abp-space-frame">
                <div className="abp-space-kicker">
                  <span className="abp-space-live-dot" aria-hidden="true" />
                  A look inside our workspace
                </div>
                <div className="abp-space-media">
                  <CultureIllustration />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={180} className="abp-space-story">
              <span className="abp-label">Where Ideas Grow</span>
              <h3>Built for people who love creating together.</h3>
              <p>
                Our space brings focused work, thoughtful conversations, and fresh ideas under one roof. It is where our team explores possibilities, solves challenges, and turns ambitious concepts into dependable digital experiences.
              </p>

              <div className="abp-space-highlights">
                {[
                  { title: 'Creative Studio', desc: 'Room to explore and shape bold ideas.', icon: FiMonitor },
                  { title: 'Collaborative Space', desc: 'A culture built around shared thinking.', icon: FiUsers },
                  { title: 'Growth Environment', desc: 'Every project creates a chance to learn.', icon: FiTrendingUp }
                ].map((item) => (
                  <div className="abp-space-highlight" key={item.title}>
                    <span className="abp-space-highlight-icon" aria-hidden="true">
                      <item.icon size={18} />
                    </span>
                    <div className="abp-space-highlight-body">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                    <span className="abp-space-highlight-arrow"><FiArrowRight size={12} /></span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </main>
  );
}
