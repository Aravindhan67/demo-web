import ScrollReveal from '../components/ScrollReveal';
import { FiFileText, FiAward, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

export default function TermsOfService() {
  const terms = [
    {
      icon: <FiFileText size={20} color="var(--orange)" />,
      title: '1. Acceptance of Terms',
      desc: 'By visiting and accessing pages under JAC MediaLand, you consent to be legally bound by these Terms of Service. If you disagree with any terms defined, you must immediately terminate access to our websites and portals.'
    },
    {
      icon: <FiAward size={20} color="var(--orange)" />,
      title: '2. Intellectual Property Rights',
      desc: 'All resources, code, layouts, vectors, typography, trademarks, and multimedia files on this platform are owned by JAC MediaLand and are protected under international copyright and trademark laws. Unauthorized reproduction or use is strictly prohibited.'
    },
    {
      icon: <FiAlertTriangle size={20} color="var(--orange)" />,
      title: '3. Limitation of Liability',
      desc: 'JAC MediaLand services are provided on an "as is" and "as available" basis. We make no representations or warranties regarding system uptime or error-free rendering. Under no circumstances will we be liable for damages resulting from platform downtime.'
    },
    {
      icon: <FiAlertCircle size={20} color="var(--orange)" />,
      title: '4. Revisions to Terms',
      desc: 'We reserve the right to alter or update these terms at any time. Changes will be posted to this page with an updated last modified date. Your continued utilization of our services implies direct acceptance of revisions.'
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
              Terms of Service
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p style={{ fontSize: '14px', color: 'var(--gray-400)', fontWeight: '600' }}>
              Last Updated: May 20, 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* TERMS WRAPPER */}
      <main className="section" style={{ padding: '80px 40px', background: 'var(--white)' }}>
        <div className="wrap split-desktop-reverse" style={{ gap: '60px', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Main content list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <ScrollReveal direction="up" delay={100}>
              <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', margin: 0 }}>
                Please review these Terms of Service carefully before utilizing our applications, platforms, or services. These terms form a legally binding contract governing access to JAC MediaLand systems.
              </p>
            </ScrollReveal>

            {terms.map((term, idx) => (
              <ScrollReveal key={term.title} direction="up" delay={(idx % 3) * 100}>
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
                    {term.icon}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: '800', color: 'var(--black)', margin: '0 0 10px 0' }}>
                      {term.title}
                    </h2>
                    <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                      {term.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal direction="up" delay={100}>
              <div style={{ borderTop: '1px dashed var(--card-border)', paddingTop: '30px' }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '10px' }}>
                  5. Governing Law
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                  These terms shall be governed by and interpreted in accordance with the laws of the Republic of India. Any litigation arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu, India.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Legal sidebar card */}
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
                  Legal Desk
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.6', marginBottom: '20px' }}>
                  For compliance questions, service licensing options, or specific partnerships terms, please email our legal desk.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', fontWeight: '600', color: 'var(--black)' }}>
                  <span>JAC MediaLand Legal Affairs</span>
                  <span style={{ color: 'var(--orange)' }}>legal@jacmedia.in</span>
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
