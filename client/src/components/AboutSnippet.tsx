import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import logoImageDark from '../assets/websitelogo_dark.webp';

export default function AboutSnippet() {
  return (
    <section className="section home-about-section" style={{ padding: '48px 20px', background: 'var(--white)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ScrollReveal direction="up" delay={100}>
          <div className="about-brutal-card">
            
            {/* LEFT COLUMN */}
            <div className="about-brutal-left">
              <span className="about-brutal-badge">Something</span>
              <h2 className="about-brutal-title">About Us</h2>
              <div className="about-brutal-logo-box">
                <img 
                  src={logoImageDark} 
                  alt="JAC Logo Mark" 
                  className="about-brutal-logo-img" 
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="about-brutal-right">
              <div className="about-brutal-paragraphs">
                <p className="about-brutal-text">
                  We provide premium quality IT services to our clients through the latest technologies at an affordable cost.
                </p>
                <p className="about-brutal-text">
                  Our goal is to dynamically grow your business, starting from the ground up or assisting in an already operating scenario.
                </p>
              </div>
              <Link to="/about" className="about-brutal-btn">
                Discover Our Spirit
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
