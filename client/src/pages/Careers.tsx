import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiClock,
  FiCoffee,
  FiCompass,
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';

const benefits = [
  { Icon: FiClock,     title: 'Flexible work hours',      description: 'Do your best work with a rhythm that supports focus and responsibility.' },
  { Icon: FiBookOpen,  title: 'Continuous learning',       description: 'Build practical skills through real work, feedback, and shared knowledge.' },
  { Icon: FiAward,     title: 'Growth with recognition',   description: 'Strong work is noticed, discussed clearly, and rewarded fairly.' },
  { Icon: FiCoffee,    title: 'Human-centered culture',    description: 'Supportive teammates, honest conversations, and room to be yourself.' },
  { Icon: FiHeart,     title: 'Inclusive environment',     description: 'Every voice matters here — diversity of thought makes our work stronger.' },
  { Icon: FiTrendingUp,title: 'Career trajectory',        description: 'We invest in your growth with clear paths, mentorship and real opportunities.' },
];

const habits = [
  {
    num: '01',
    title: 'Curiosity before certainty',
    desc: 'We ask better questions before rushing into solutions.',
    icon: FiCompass,
  },
  {
    num: '02',
    title: 'Collaborate without ego',
    desc: 'Good ideas can come from anywhere, and credit is shared.',
    icon: FiUsers,
  },
  {
    num: '03',
    title: 'Make useful progress',
    desc: 'We value steady, visible improvement over empty busyness.',
    icon: FiZap,
  },
];

const hiringSteps = [
  { num: '01', label: 'Share your profile',      desc: 'Send us your work, background, or anything that represents you best.' },
  { num: '02', label: 'Intro conversation',       desc: "A short call to understand what drives you and what you're looking for." },
  { num: '03', label: 'Practical discussion',     desc: 'A real problem, together — no gotchas, just genuine thinking.' },
  { num: '04', label: 'Mutual decision',          desc: "We both decide if it's the right fit, together and openly." },
];



export default function Careers() {
  return (
    <main className="page careers-page" style={{ display: 'block' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="crp-hero">
        <div className="crp-hero-inner">
          <ScrollReveal direction="up" delay={60}>
            <span className="crp-badge">
              <span className="crp-badge-dot" />
              We're Hiring
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <h1 className="crp-hero-title">
              Do meaningful work<br />
              <span className="crp-hero-title-accent">with people who care.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={180}>
            <p className="crp-hero-sub">
              We're a growing team of designers, engineers, and creators who value curiosity,
              dependable execution, and learning together.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={240}>
            <div className="crp-hero-actions">
              <Link to="/careers/talent-network" className="crp-btn-primary">
                Apply for a role <FiArrowRight />
              </Link>
              <a href="#how-we-work" className="crp-btn-ghost">
                How we work ↓
              </a>
            </div>
          </ScrollReveal>

          {/* Floating stat pills */}
          <ScrollReveal direction="up" delay={300}>
            <div className="crp-hero-stats">
              <div className="crp-stat-pill"><span>50+</span> Projects delivered</div>
              <div className="crp-stat-pill"><span>3+</span> Years building</div>
              <div className="crp-stat-pill"><span>∞</span> Learning ahead</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative grid lines */}
        <div className="crp-hero-grid" aria-hidden="true" />
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────── */}
      <section className="crp-hww-section" id="how-we-work">
        <div className="crp-hww-inner">
          <ScrollReveal direction="up" delay={60}>
            <div className="crp-hww-header">
              <span className="crp-label">How we work</span>
              <h2 className="crp-hww-title">The habits we respect.</h2>
              <p className="crp-hww-sub">
                These aren't rules — they're the way good people naturally work when the environment supports it.
              </p>
            </div>
          </ScrollReveal>

          <div className="crp-hww-cards">
            {habits.map((h, idx) => (
              <ScrollReveal key={h.num} direction="up" delay={idx * 100}>
                <div className="crp-hww-card">
                  <div className="crp-hww-card-top">
                    <span className="crp-hww-num">{h.num}</span>
                    <span className="crp-hww-icon-wrap">
                      <h.icon size={22} />
                    </span>
                  </div>
                  <h3 className="crp-hww-card-title">{h.title}</h3>
                  <p className="crp-hww-card-desc">{h.desc}</p>
                  <div className="crp-hww-card-footer">
                    <span className="crp-hww-arrow">→</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────── */}
      <section className="crp-benefits-section" id="culture">
        <div className="crp-benefits-inner">
          <ScrollReveal direction="up" delay={60}>
            <div className="crp-section-head">
              <span className="crp-label">Life on the team</span>
              <h2>A place to grow your craft<br />and your confidence.</h2>
              <p>We keep the environment supportive, the standards high, and the communication clear.</p>
            </div>
          </ScrollReveal>

          <div className="crp-benefits-grid">
            {benefits.map(({ Icon, title, description }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 60}>
                <div className="crp-benefit-card">
                  <span className="crp-benefit-icon"><Icon size={24} /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="crp-benefit-check"><FiCheck size={13} /></span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── HIRING PROCESS ────────────────────────────────────── */}
      <section className="crp-process-section">
        <div className="crp-process-inner">
          <ScrollReveal direction="up" delay={60}>
            <div className="crp-section-head">
              <span className="crp-label">Simple and respectful</span>
              <h2>What the hiring journey looks like.</h2>
              <p>No mystery, no mind games. Just four honest steps.</p>
            </div>
          </ScrollReveal>

          <div className="crp-process-steps">
            {hiringSteps.map((step, idx) => (
              <ScrollReveal key={step.num} direction="up" delay={idx * 90}>
                <div className="crp-process-step">
                  <div className="crp-process-step-num">{step.num}</div>
                  <div className="crp-process-step-body">
                    <h3>{step.label}</h3>
                    <p>{step.desc}</p>
                  </div>
                  {idx < hiringSteps.length - 1 && (
                    <div className="crp-process-connector" aria-hidden="true" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="crp-cta-section">
        <div className="crp-cta-inner">
          <ScrollReveal direction="up" delay={60}>
            <span className="crp-badge crp-badge-white">
              <FiBriefcase size={12} />
              Join the team
            </span>
            <h2 className="crp-cta-title">Ready to do work that matters?</h2>
            <p className="crp-cta-sub">
              We hire for potential, craft, and how you work with others.<br />
              Tell us who you are — we'll take it from there.
            </p>
            <Link to="/careers/talent-network" className="crp-cta-btn">
              Apply now <FiArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
