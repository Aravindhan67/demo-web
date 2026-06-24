import ScrollReveal from '../components/ScrollReveal';
import { FiShield, FiLock, FiInfo, FiActivity } from 'react-icons/fi';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FiInfo size={20} color="var(--orange)" />,
      title: '1. Information We Collect',
      desc: 'We collect personal information that you voluntarily provide to us when you fill out contact forms, apply for internship programs, or send inquiries. This includes names, email addresses, phone numbers, and professional backgrounds/resumes.'
    },
    {
      icon: <FiActivity size={20} color="var(--orange)" />,
      title: '2. How We Use Your Information',
      desc: 'Your data is utilized to deliver client services, process job applications, send newsletter updates, respond to specific requests, and maintain the safety and performance of our web systems.'
    },
    {
      icon: <FiLock size={20} color="var(--orange)" />,
      title: '3. Data Retention & Security',
      desc: 'We implement high-grade industry standard technical security measures to keep your data protected. Personal information is only retained as long as necessary for delivery of business solutions or until you ask for removal.'
    },
    {
      icon: <FiShield size={20} color="var(--orange)" />,
      title: '4. Your Data Rights',
      desc: 'You have complete rights to request access, correction, transfer, or complete erasure of your stored personal details at any time by contacting our system administrator.'
    }
  ];

  return (
    <div className="page" style={{ display: 'block' }}>
      
      {/* HEADER SECTION */}
      <section className="section" style={{ background: 'var(--hero-bg)', padding: '60px 40px', borderBottom: '1px solid var(--card-border)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ScrollReveal direction="up" delay={100}>
            <span className="chip" style={{ background: 'var(--orange-light)', color: 'var(--orange)', border: 'none' }}>Legal Documentation</span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '46px', fontWeight: '800', color: 'var(--black)', margin: 0 }}>
              Privacy Policy
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p style={{ fontSize: '14px', color: 'var(--gray-400)', fontWeight: '600' }}>
              Last Updated: May 20, 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* DOCUMENT WRAPPER */}
      <main className="section" style={{ padding: '80px 40px', background: 'var(--white)' }}>
        <div className="wrap split-desktop-reverse" style={{ gap: '60px', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <ScrollReveal direction="up" delay={100}>
              <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', margin: 0 }}>
                At JAC MediaLand, we prioritize the protection and security of your personal data. This privacy document outlines how we collect, store, share, and utilize information provided when you interact with our websites, online services, or application portals.
              </p>
            </ScrollReveal>

            {sections.map((sec, idx) => (
              <ScrollReveal key={sec.title} direction="up" delay={(idx % 3) * 100}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--gray-50)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {sec.icon}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: '800', color: 'var(--black)', margin: '0 0 10px 0' }}>
                      {sec.title}
                    </h2>
                    <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                      {sec.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal direction="up" delay={100}>
              <div style={{ borderTop: '1px dashed var(--card-border)', paddingTop: '30px' }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '10px' }}>
                  5. Cookie Policy
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                  We utilize cookies and analytics trackers to study network usage patterns and customize user layout parameters. Cookies are tiny records stored on your hard disk by web browsers. You may deactivate cookies in your browser settings, though some page functionality may be restricted as a consequence.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Contacts Sidebar card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <ScrollReveal direction="up" delay={200}>
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '12px' }}>
                  Privacy Questions?
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.6', marginBottom: '20px' }}>
                  If you have inquiries, concerns, or requests regarding this Privacy Policy or your data usage, reach out directly to our privacy compliance officer.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', fontWeight: '600', color: 'var(--black)' }}>
                  <span>JAC MediaLand Compliance Desk</span>
                  <span style={{ color: 'var(--orange)' }}>privacy@jacmedia.in</span>
                  <span style={{ color: 'var(--gray-400)' }}>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </main>

    </div>
  );
}
