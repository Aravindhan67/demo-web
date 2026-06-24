import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { fetchCmsServices } from '../api/cmsClient';
import { serviceDetails, type ServiceDetailDefinition } from '../data/serviceDetails';
import { mergeCmsServices, services, type ServiceDefinition } from '../data/services';
import NotFound from '../pages/NotFound';

interface ServiceDetailPageProps {
  path: string;
  serviceOverride?: ServiceDefinition;
  detailOverride?: ServiceDetailDefinition;
}

export default function ServiceDetailPage({ path, serviceOverride, detailOverride }: ServiceDetailPageProps) {
  const detail = detailOverride ?? serviceDetails.find((item) => item.path === path);
  const localService = services.find((item) => item.path === path);
  const [resolvedService, setResolvedService] = useState<ServiceDefinition | null | undefined>(serviceOverride);
  const [cmsChecked, setCmsChecked] = useState(Boolean(serviceOverride));

  useEffect(() => {
    if (serviceOverride) return;

    void fetchCmsServices()
      .then((records) => setResolvedService(mergeCmsServices(records).find((item) => item.path === path) ?? null))
      .catch(() => setResolvedService(localService))
      .finally(() => setCmsChecked(true));
  }, [localService, path, serviceOverride]);

  const service = serviceOverride ?? (cmsChecked ? resolvedService : localService);

  if (!detail || !service) {
    return cmsChecked ? <NotFound /> : null;
  }

  const relatedServices = detail.relatedPaths
    .map((relatedPath) => services.find((item) => item.path === relatedPath))
    .filter((item) => item !== undefined);
  const { Icon } = service;

  return (
    <main className="page service-detail-page" style={{ display: 'block' }}>
      <section className="service-detail-hero">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <Link to="/services" className="service-detail-back">
              <FiArrowLeft aria-hidden="true" />
              All services
            </Link>
          </ScrollReveal>

          <div className="service-detail-hero-layout">
            <ScrollReveal direction="up" delay={100}>
              <div className="service-detail-hero-copy">
                <div className="service-detail-kicker">
                  <span>{service.number}</span>
                  <span>{service.subtitle}</span>
                </div>
                <h1>{service.title}</h1>
                <p className="service-detail-statement">{detail.heroStatement}</p>
                <p className="service-detail-description">{service.description}</p>
                <div className="service-detail-actions">
                  <Link to="/contact" className="btn-3d btn-3d-secondary">
                    <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Start a project
                      <FiArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                  <a href="#deliverables" className="btn-3d">
                    <span className="button_top">See deliverables</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={180}>
              <aside className="service-detail-summary" aria-label={`${service.title} capabilities`}>
                <span className="service-detail-summary-icon"><Icon aria-hidden="true" /></span>
                <span className="service-detail-summary-label">Core capabilities</span>
                <ul>
                  {service.capabilities.map((capability) => (
                    <li key={capability}><FiCheck aria-hidden="true" />{capability}</li>
                  ))}
                </ul>
                <p>One focused team from first conversation through delivery and ongoing support.</p>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="service-detail-deliverables" id="deliverables">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="service-detail-heading">
              <div>
                <span className="services-section-label">Built around your outcome</span>
                <h2>{detail.deliverablesTitle}</h2>
              </div>
              <p>{detail.deliverablesIntro}</p>
            </div>
          </ScrollReveal>

          <div className="service-detail-grid">
            {detail.deliverables.map(({ title, description, Icon: DeliverableIcon }, index) => (
              <ScrollReveal key={title} direction="up" delay={(index % 3) * 70}>
                <article className="service-deliverable-card">
                  <span className="service-deliverable-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-deliverable-icon"><DeliverableIcon aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-process">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="service-detail-heading service-detail-heading-centered">
              <div>
                <span className="services-section-label">A clear working rhythm</span>
                <h2>From first conversation to measurable progress.</h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="service-process-grid">
            {detail.process.map((step, index) => (
              <ScrollReveal key={step.title} direction="up" delay={index * 70}>
                <article className="service-process-card">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-benefits">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="service-benefits-panel">
              <div className="service-benefits-intro">
                <span className="services-section-label">Why work with us</span>
                <h2>Clear decisions, dependable execution, useful outcomes.</h2>
              </div>
              <div className="service-benefits-grid">
                {detail.benefits.map(({ title, description, Icon: BenefitIcon }) => (
                  <div className="service-benefit-item" key={title}>
                    <span><BenefitIcon aria-hidden="true" /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {detail.technologies && (
        <section className="service-detail-technologies">
          <div className="wrap service-detail-container">
            <ScrollReveal direction="up" delay={60}>
              <div className="service-detail-heading">
                <div>
                  <span className="services-section-label">Technology choices</span>
                  <h2>Tools selected around the product, not the trend.</h2>
                </div>
                <p>We choose a practical stack based on product goals, team needs, scale, and maintainability.</p>
              </div>
            </ScrollReveal>
            <div className="service-tech-grid">
              {detail.technologies.map((technology, index) => (
                <ScrollReveal key={technology} direction="up" delay={(index % 8) * 35}>
                  <span>{technology}</span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && <section className="service-related">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="service-detail-heading">
              <div>
                <span className="services-section-label">Build a connected solution</span>
                <h2>Related services</h2>
              </div>
              <p>Combine focused expertise into one clear plan around your business goal.</p>
            </div>
          </ScrollReveal>

          <div className="service-related-grid">
            {relatedServices.map(({ title, subtitle, path: relatedPath, Icon: RelatedIcon }) => (
              <ScrollReveal key={relatedPath} direction="up" delay={70}>
                <Link to={relatedPath} className="service-related-card">
                  <span><RelatedIcon aria-hidden="true" /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </div>
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>}

      <section className="service-detail-cta">
        <div className="wrap service-detail-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="service-detail-cta-card">
              <div>
                <span className="services-section-label">Ready when you are</span>
                <h2>{detail.ctaTitle}</h2>
                <p>{detail.ctaText}</p>
              </div>
              <Link to="/contact" className="service-detail-cta-button">
                {detail.ctaLabel}
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
