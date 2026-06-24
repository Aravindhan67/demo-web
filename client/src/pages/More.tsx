import { FiClock, FiHome, FiCheck, FiSliders } from 'react-icons/fi';

export default function More() {
  return (
    <main className="page active" style={{ display: 'block', background: 'var(--hero-bg)', minHeight: '85vh' }}>
      <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient background decoration */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'rgba(var(--orange-rgb), 0.02)',
            borderRadius: '50%',
            filter: 'blur(150px)',
            zIndex: 0,
            pointerEvents: 'none'
          }} 
        />

        <div className="wrap" style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Tag / Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--orange-light)', color: 'var(--orange)', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>
            <FiClock size={14} />
            <span>Coming Soon</span>
          </div>

          {/* Heading */}
          <h1 className="section-title" style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', letterSpacing: '-2px', lineHeight: '1.1', marginBottom: '20px', fontFamily: "'Syne', sans-serif" }}>
            Our Other Services
          </h1>

          {/* Subheading */}
          <p className="section-sub" style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', marginBottom: '56px', maxWidth: '600px', margin: '0 auto 56px' }}>
            Expanding our commitment to quality across construction, interior systems, and premium automotive experiences. Explore our upcoming ventures.
          </p>

          {/* Two Cards Grid */}
          <div className="coming-soon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '64px', maxWidth: '850px', margin: '0 auto 64px', textAlign: 'left' }}>

             {/* Card 2: JAC Construction */}
            <div className="coming-soon-card" style={{
              background: 'var(--white)',
              border: '1px solid var(--card-border)',
              borderRadius: '24px',
              padding: '36px 30px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img src={`${import.meta.env.BASE_URL}team/jac-construction-logo.png`} alt="JAC Construction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--orange)', background: 'var(--orange-light)', padding: '4px 12px', borderRadius: '50px' }}>
                    Construction
                  </span>
                </div>
                
                <h2 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '16px', color: 'var(--black)', fontFamily: "'Syne', sans-serif" }}>
                  JAC Construction
                </h2>
                
                <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', marginBottom: '28px' }}>
                  Pioneering modern building development, civil engineering, and architectural contracting. We craft custom premium residences and commercial projects with structural excellence and refined finishes.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> Custom Residential & Commercial Build
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> Eco-Friendly Engineering & Design
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> End-to-End Contracting Services
                  </li>
                </ul>
              </div>

              <div className="btn-3d btn-3d-secondary" style={{ width: '100%', textAlign: 'center', cursor: 'default', opacity: 0.8 }}>
                <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: 'var(--gray-100)', color: 'var(--gray-400)', border: '1px solid var(--card-border)' }}>
                  <span>Coming Soon</span>
                </span>
              </div>
            </div>
            
            {/* Card 1: JAC Cars */}
            <div className="coming-soon-card" style={{
              background: 'var(--white)',
              border: '1px solid var(--card-border)',
              borderRadius: '24px',
              padding: '36px 30px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img src={`${import.meta.env.BASE_URL}team/jac-cars-logo.png`} alt="JAC Cars" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--orange)', background: 'var(--orange-light)', padding: '4px 12px', borderRadius: '50px' }}>
                    Automotive
                  </span>
                </div>
                
                <h2 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '16px', color: 'var(--black)', fontFamily: "'Syne', sans-serif" }}>
                  JAC Cars
                </h2>
                
                <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', marginBottom: '28px' }}>
                  Providing premium certified pre-owned vehicles, luxury car detailing, protective ceramic coatings, and high-end automotive modifications with strict quality assurance.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> Custom Detailing & PPF Solutions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> Certified Pre-Owned Vehicle Sales
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--black)', fontWeight: '600' }}>
                    <FiCheck size={16} style={{ color: 'var(--orange)' }} /> Premium Event & Corporate Rentals
                  </li>
                </ul>
              </div>

              <div className="btn-3d btn-3d-secondary" style={{ width: '100%', textAlign: 'center', cursor: 'default', opacity: 0.8 }}>
                <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: 'var(--gray-100)', color: 'var(--gray-400)', border: '1px solid var(--card-border)' }}>
                  <span>Coming Soon</span>
                </span>
              </div>
            </div>

           
          </div>
        </div>
      </section>
      
      {/* Interactive hover styling & animations */}
      <style>{`
        .coming-soon-card:hover {
          transform: translateY(-8px);
          border-color: var(--black) !important;
          box-shadow: var(--shadow-xl) !important;
        }
      `}</style>
    </main>
  );
}
