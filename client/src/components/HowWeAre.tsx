import { FiUsers, FiClock, FiCoffee, FiSmile, FiTrendingUp, FiZap } from 'react-icons/fi';

export default function HowWeAre() {
  return (
    <>
      {/* HOW WE ARE */}
      <section style={{ padding: '80px 40px', background: 'var(--white)', borderTop: '1px solid var(--card-border)' }}>
        <div className="how-we-are-layout" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <FiUsers size={64} color="var(--orange)" style={{ opacity: 0.8, strokeWidth: 1.2 }} />
          </div>
          
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: '800', marginBottom: '32px', color: 'var(--black)', letterSpacing: '-1px' }}>
              How We <span style={{ color: 'var(--orange)' }}>Are</span>
            </h2>
            <div className="how-we-are-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiUsers size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Like-minded Peers</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiClock size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Flexible Timings</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiCoffee size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Relax Zone</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiSmile size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Casual Dress</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiTrendingUp size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Career Growth</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gray-50)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiZap size={20} color="var(--orange)" style={{ strokeWidth: 2 }} />
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: '600', lineHeight: '1.4' }}>Hyper-Growth</span>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
