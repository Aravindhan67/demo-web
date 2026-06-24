import { Link } from 'react-router-dom';
import { FiPenTool, FiCode, FiSmartphone, FiTrendingUp, FiShield, FiBookOpen } from 'react-icons/fi';

export default function WhatWeDo() {
  return (
    <>
      {/* WHAT WE DO */}
      <section style={{ padding: '80px 40px', background: 'var(--white)', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: '800', textAlign: 'center', marginBottom: '40px', color: 'var(--black)', letterSpacing: '-1px' }}>
            What We Do
          </h2>
          <div className="what-we-do-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiPenTool size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>Graphic Design</div>
              <Link to="/services/graphic-design" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiCode size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>Web Development</div>
              <Link to="/services/website-development" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiSmartphone size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>App Development</div>
              <Link to="/services/app-development" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiTrendingUp size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>Digital Marketing</div>
              <Link to="/services/digital-marketing" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiShield size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>Ethical Hacking</div>
              <Link to="/services/security" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
            <div className="service-card" style={{ border: '1px solid var(--card-border)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: 'var(--card-bg)', transition: 'var(--transition)' }}>
              <FiBookOpen size={32} color="var(--black)" style={{ strokeWidth: 1.8 }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--black)', textAlign: 'center', fontFamily: "'Syne', sans-serif" }}>Training</div>
              <Link to="/services" className="btn-3d" style={{ fontSize: '11.5px' }}>
                <span className="button_top" style={{ padding: '6px 14px' }}>Know more</span>
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
