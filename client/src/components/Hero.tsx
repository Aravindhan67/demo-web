import heroIllustration from '../assets/hero_illustration.png';

export default function Hero() {
  return (
    <>
      <div className="hero-section">
        {/* Ambient Glowing Background Orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: '450px', height: '450px', background: 'rgba(var(--orange-rgb), 0.09)', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: '500px', height: '500px', background: 'rgba(99, 102, 241, 0.09)', borderRadius: '50%', filter: 'blur(140px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }}></span> JAC MediaLand</span>
            <h1 className="hero-heading">Architecting the Future of<br /><span className="gradient-keyword">Digital Innovation</span></h1>
            <p className="hero-sub">We empower businesses with cutting-edge software engineering, premium branding, and scalable web & mobile solutions.</p>
            <div className="hero-cta">
              <button className="hero-play-btn" >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              </button>
              <span className="hero-cta-label">Discover our development approach</span>
            </div>
          </div>
        </div>
        <div className="hero-artwork" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1 }}>
          <img src={heroIllustration} alt="Collaborative Tech Team" style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.08))' }} />
        </div>
      </div>
    </>
  );
}
