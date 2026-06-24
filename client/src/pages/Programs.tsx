import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiCode,
  FiLayers,
  FiUsers
} from 'react-icons/fi';
import internshipProgram from '../assets/internship_program.jpg';
import heroIllustration from '../assets/hero_illustration.png';
import professionalTeam from '../assets/professional_team.png';
import { useCmsCollection } from '../api/useCmsCollection';
import { fallbackPrograms, type ProgramItem } from '../data/cmsSections';

const learningBenefits = [
  { title: 'Real Projects', description: 'Build practical experience through meaningful work.', icon: <FiBriefcase /> },
  { title: 'Expert Mentorship', description: 'Learn with guidance from experienced professionals.', icon: <FiUsers /> },
  { title: 'Career Readiness', description: 'Develop the confidence and skills to move forward.', icon: <FiAward /> }
];

const programImages: Record<string, string> = {
  internship: internshipProgram,
  'full-stack': heroIllustration,
  design: professionalTeam
};

export default function Programs() {
  const programs = useCmsCollection('programs', fallbackPrograms);
  const activeProgram = programs.find((program) => program.kind === 'active') ?? fallbackPrograms[0];
  const upcomingPrograms = programs.filter((program) => program.kind === 'upcoming');

  return (
    <main className="page prg-page" style={{ display: 'block' }}>
      
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="prg-hero">
        <div className="prg-hero-inner">
          <ScrollReveal direction="up" delay={60}>
            <span className="prg-badge">
              <span className="prg-badge-dot" />
              Education & Career Pathways
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <h1 className="prg-hero-title">
              Grow Skills.<br />
              <span className="prg-hero-title-accent">Build Careers.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={180}>
            <p className="prg-hero-sub">
              Unlock your potential with immersive learning experiences, expert guidance,
              and real-world projects that help your portfolio stand out.
            </p>
          </ScrollReveal>
        </div>

        {/* Decorative grid background */}
        <div className="prg-hero-grid" aria-hidden="true" />
      </section>

      {/* ── ACTIVE PROGRAM SHOWCASE ───────────────────────────── */}
      <section className="prg-section prg-white-bg">
        <div className="prg-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="prg-sec-header">
              <div className="prg-sec-header-left">
                <span className="prg-label">Open Opportunity</span>
                <h2 className="prg-sec-title">Start building your future today.</h2>
              </div>
              <p className="prg-sec-description">Our active internship gives students and freshers practical exposure across digital disciplines.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <div className="prg-featured-card">
              <div className="prg-featured-image-col">
                <img src={programImages[activeProgram.imageKey ?? 'internship'] ?? internshipProgram} alt={activeProgram.title} />
                <span className="prg-status-badge prg-status-open">{activeProgram.launch}</span>
              </div>
              
              <div className="prg-featured-content-col">
                <span className="prg-featured-eyebrow">
                  <FiBookOpen aria-hidden="true" /> Learn by doing
                </span>
                <h3 className="prg-featured-title">{activeProgram.title}</h3>
                <p className="prg-featured-desc">{activeProgram.description}</p>
                
                <div className="prg-featured-meta">
                  <div className="prg-meta-pill"><FiBriefcase aria-hidden="true" /> <span>Real project experience</span></div>
                  <div className="prg-meta-pill"><FiUsers aria-hidden="true" /> <span>Expert mentorship</span></div>
                  <div className="prg-meta-pill"><FiAward aria-hidden="true" /> <span>Completion certificate</span></div>
                </div>
                
                <div className="prg-featured-action">
                  <Link to={activeProgram.path ?? '/programs/internship'} className="prg-btn-brutal">
                    View Program Details <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── BENEFITS GRID ────────────────────────────────────── */}
          <div className="prg-benefits-grid">
            {learningBenefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} direction="up" delay={index * 80}>
                <article className="prg-benefit-card">
                  <span className="prg-benefit-icon-wrap" aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <div className="prg-benefit-card-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING PROGRAMS ─────────────────────────────────── */}
      <section className="prg-section prg-gray-bg">
        <div className="prg-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="prg-sec-header">
              <div className="prg-sec-header-left">
                <span className="prg-label">Coming Next</span>
                <h2 className="prg-sec-title">More pathways are on the way.</h2>
              </div>
              <p className="prg-sec-description">Focused programs designed to turn curiosity into practical, career-ready ability.</p>
            </div>
          </ScrollReveal>

          <div className="prg-upcoming-grid">
            {upcomingPrograms.map((program, index) => (
              <ScrollReveal key={program.title} direction="up" delay={index * 100}>
                <article className="prg-upcoming-card">
                  <div className="prg-upcoming-image-wrap">
                    <img src={programImages[program.imageKey ?? ''] ?? heroIllustration} alt="" aria-hidden="true" />
                    <span className="prg-status-badge">Coming Soon</span>
                  </div>
                  <div className="prg-upcoming-card-body">
                    <div className="prg-upcoming-card-header">
                      <span className="prg-upcoming-icon" aria-hidden="true">
                        {program.imageKey === 'design' ? <FiLayers /> : <FiCode />}
                      </span>
                      <span className="prg-upcoming-launch">
                        <FiClock aria-hidden="true" /> {program.launch}
                      </span>
                    </div>
                    <div className="prg-upcoming-copy">
                      <h3>{program.title}</h3>
                      <p>{program.description}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
