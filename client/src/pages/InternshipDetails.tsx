import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCode,
  FiLayout,
  FiTrendingUp,
  FiPenTool,
  FiBarChart2,
  FiGlobe,
  FiMonitor,
  FiStar,
  FiMail,
  FiPhone,
  FiSend,
  FiBookOpen,
  FiBriefcase,
  FiUsers,
  FiAward,
} from 'react-icons/fi';
import internshipProgram from '../assets/internship_program.jpg';

const domains = [
  { title: 'Website Development', icon: <FiCode /> },
  { title: 'UI/UX Design',        icon: <FiLayout /> },
  { title: 'SEO Marketing',       icon: <FiTrendingUp /> },
  { title: 'Graphic Design',      icon: <FiPenTool /> },
  { title: 'Digital Marketing',   icon: <FiBarChart2 /> },
];

const modes = [
  { label: 'Offline', icon: <FiMonitor /> },
  { label: 'Online',  icon: <FiGlobe /> },
];

const benefits = [
  { text: 'Real Project Experience',       icon: <FiBriefcase /> },
  { text: 'Expert Mentorship',             icon: <FiUsers /> },
  { text: 'Skill Development',             icon: <FiStar /> },
  { text: 'Certificate of Completion',     icon: <FiAward /> },
  { text: 'Career Growth Opportunities',   icon: <FiTrendingUp /> },
];

export default function InternshipDetails() {
  const navigate = useNavigate();

  return (
    <main className="intd-page">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="intd-hero">
        <div className="intd-hero-grid" aria-hidden="true" />
        <div className="intd-hero-inner">
          <ScrollReveal direction="up" delay={60}>
            <span className="intd-badge">
              <span className="intd-badge-dot" />
              JAC MediaLand Dream Zone
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <h1 className="intd-hero-title">
              Internship<br />
              <span className="intd-hero-title-accent">Program</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={180}>
            <p className="intd-hero-sub">
              Learn · Grow · Succeed
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <section className="intd-section intd-white-bg">
        <div className="intd-container">

          {/* Back Button */}
          <ScrollReveal direction="up" delay={50}>
            <button className="intd-back-btn" onClick={() => navigate('/programs')}>
              <FiArrowLeft size={17} strokeWidth={2.5} />
              Back to Programs
            </button>
          </ScrollReveal>

          {/* Two-column layout */}
          <div className="intd-layout">

            {/* ── LEFT COLUMN ───────────────── */}
            <div className="intd-content-col">

              {/* Intro */}
              <ScrollReveal direction="up" delay={150}>
                <div className="intd-block">
                  <span className="intd-eyebrow">
                    <FiBookOpen aria-hidden="true" /> About the Program
                  </span>
                  <h2 className="intd-block-title">Shape Your Future Today</h2>
                  <p className="intd-body-text">
                    Kickstart your career with hands-on industry experience and expert mentorship at{' '}
                    <strong>JAC MediaLand</strong>. Our Internship Program is designed to help students
                    and freshers develop practical skills, work on real-time projects, and gain
                    professional exposure in the digital world.
                  </p>
                </div>
              </ScrollReveal>

              {/* Domains */}
              <ScrollReveal direction="up" delay={200}>
                <div className="intd-block">
                  <span className="intd-eyebrow">
                    <FiCode aria-hidden="true" /> Internship Domains
                  </span>
                  <div className="intd-domains-grid">
                    {domains.map((d) => (
                      <div key={d.title} className="intd-domain-pill">
                        <span className="intd-domain-icon" aria-hidden="true">{d.icon}</span>
                        <span className="intd-domain-label">{d.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Modes */}
              <ScrollReveal direction="up" delay={250}>
                <div className="intd-block">
                  <span className="intd-eyebrow">
                    <FiGlobe aria-hidden="true" /> Available Modes
                  </span>
                  <div className="intd-modes-row">
                    {modes.map((m) => (
                      <div key={m.label} className="intd-mode-tag">
                        <span className="intd-mode-icon" aria-hidden="true">{m.icon}</span>
                        {m.label}
                      </div>
                    ))}
                  </div>
                  <p className="intd-body-text" style={{ marginTop: '12px' }}>
                    We support both <strong>Offline</strong> and <strong>Online</strong> modes,
                    making learning flexible for you.
                  </p>
                </div>
              </ScrollReveal>

              {/* Benefits */}
              <ScrollReveal direction="up" delay={300}>
                <div className="intd-block">
                  <span className="intd-eyebrow">
                    <FiStar aria-hidden="true" /> Why Join Us?
                  </span>
                  <ul className="intd-benefits-list">
                    {benefits.map((b) => (
                      <li key={b.text} className="intd-benefit-item">
                        <span className="intd-benefit-icon" aria-hidden="true">
                          <FiCheck size={14} strokeWidth={3} />
                        </span>
                        <span className="intd-benefit-meta-icon" aria-hidden="true">{b.icon}</span>
                        {b.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Contact */}
              <ScrollReveal direction="up" delay={350}>
                <div className="intd-contact-card">
                  <span className="intd-eyebrow">
                    <FiMail aria-hidden="true" /> Contact Us
                  </span>
                  <div className="intd-contact-row">
                    <span className="intd-contact-icon"><FiMail size={15} /></span>
                    <a href="mailto:jaccreationhouse@gmail.com" className="intd-contact-link">
                      jaccreationhouse@gmail.com
                    </a>
                  </div>
                  <div className="intd-contact-row">
                    <span className="intd-contact-icon"><FiPhone size={15} /></span>
                    <a href="tel:7338891367" className="intd-contact-link">
                      7338891367
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal direction="up" delay={400}>
                <a
                  href="https://forms.gle/vNz9mRHVJhjYXjen8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="intd-cta-btn"
                >
                  Apply For Internship
                  <FiSend size={16} strokeWidth={2} />
                </a>
              </ScrollReveal>
            </div>

            {/* ── RIGHT COLUMN: Poster ──────── */}
            <ScrollReveal direction="left" delay={100}>
              <div className="intd-poster-wrap">
                <img
                  src={internshipProgram}
                  alt="Internship Program Flyer"
                  className="intd-poster-img"
                />
                <span className="intd-poster-badge">
                  <span className="intd-badge-dot" />
                  Now Open
                </span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

    </main>
  );
}
