import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiMessageCircle } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import { mergeCmsServices, services } from '../data/services';
import { fetchCmsServices } from '../api/cmsClient';

export default function Services() {
  const [serviceCatalogue, setServiceCatalogue] = useState(services);

  useEffect(() => {
    void fetchCmsServices()
      .then((cmsServices) => setServiceCatalogue(mergeCmsServices(cmsServices)))
      .catch(() => setServiceCatalogue(services));
  }, []);

  return (
    <main className="page services-page" style={{ display: 'block' }}>
      <section className="services-hero">
        <div className="wrap services-container">
          <div className="services-hero-layout">
            <ScrollReveal direction="up" delay={80}>
              <div className="services-hero-copy">
                <span className="chip services-chip">Our Expertise</span>
                <h1>A structured digital team for every stage of growth.</h1>
                <p>
                  Strategy, design, technology, and marketing working together to move your business from idea to measurable impact.
                </p>
                <div className="services-hero-actions">
                  <Link to="/contact" className="btn-3d btn-3d-secondary">
                    <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Discuss your project
                      <FiArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                  <a href="#service-catalogue" className="btn-3d">
                    <span className="button_top">Explore services</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={180}>
              <div className="services-hero-summary" aria-label="Services overview">
                <div className="services-summary-intro">
                  <span>One connected team</span>
                  <p>Clear ownership from first conversation through launch and ongoing support.</p>
                </div>
                <div className="services-summary-grid">
                  <div>
                    <strong>{String(serviceCatalogue.length).padStart(2, '0')}</strong>
                    <span>Core services</span>
                  </div>
                  <div>
                    <strong>01</strong>
                    <span>Reliable partner</span>
                  </div>
                  <div>
                    <strong>360 deg</strong>
                    <span>Digital support</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>Project visibility</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="services-catalogue" id="service-catalogue">
        <div className="wrap services-container">
          <ScrollReveal direction="up" delay={80}>
            <div className="services-section-heading">
              <div>
                <span className="services-section-label">How we help</span>
                <h2>Specialists where you need them. One system around them.</h2>
              </div>
              <p>Select a focused service or combine capabilities into one clear growth plan.</p>
            </div>
          </ScrollReveal>

          <div className="services-system-grid">
            {serviceCatalogue.map(({ number, title, tagline, description, path, capabilities, Icon, featured }, index) => (
              <ScrollReveal
                key={path}
                className={`services-system-item ${featured ? 'services-system-item-featured' : ''}`}
                direction="up"
                delay={(index % 3) * 80}
              >
                <article className="services-system-card">
                  <div className="services-card-topline">
                    <span className="services-card-number">{number}</span>
                    <span className="services-card-icon"><Icon aria-hidden="true" /></span>
                  </div>
                  <div className="services-card-copy">
                    <span className="services-card-tagline">{tagline}</span>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </div>
                  <ul className="services-capabilities" aria-label={`${title} capabilities`}>
                    {capabilities.map((capability) => (
                      <li key={capability}><FiCheck aria-hidden="true" />{capability}</li>
                    ))}
                  </ul>
                  <Link to={path} className="services-card-link" aria-label={`Explore ${title}`}>
                    Explore service
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="services-consultation">
        <div className="wrap services-container">
          <ScrollReveal direction="up" delay={80}>
            <div className="services-consultation-card">
              <span className="services-consultation-icon"><FiMessageCircle aria-hidden="true" /></span>
              <div>
                <span className="services-section-label">Not sure where to start?</span>
                <h2>Tell us the outcome you need. We'll shape the right service mix.</h2>
              </div>
              <Link to="/contact" className="btn-3d btn-3d-secondary">
                <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Start a conversation
                  <FiArrowRight aria-hidden="true" />
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
