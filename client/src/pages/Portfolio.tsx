import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBriefcase, FiExternalLink, FiFolder, FiGrid, FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCmsCollection } from '../api/useCmsCollection';
import { fallbackPortfolioProjects, type PortfolioProjectItem } from '../data/cmsSections';
import ScrollReveal from '../components/ScrollReveal';

import { buildCmsUrl } from '../api/cmsClient';

const portfolioFilters = [
  { id: 'all', label: 'All work', count: 4 },
  { id: 'development', label: 'Development', count: 4 },
  { id: 'ux', label: 'UX / UI', count: 0 },
  { id: 'brand', label: 'Brand Identity', count: 0 },
  { id: 'logo', label: 'Logo Design', count: 0 },
  { id: 'packaging', label: 'Packaging', count: 0 }
];

const getDisplayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

function resolveUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('/uploads')) return buildCmsUrl(path);
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const finalBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${finalBaseUrl}${cleanPath}`;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLogoIndex, setActiveLogoIndex] = useState<number | null>(null);
  
  const projects = useCmsCollection<PortfolioProjectItem>('portfolioProjects', fallbackPortfolioProjects);
  const logoProjects = projects.filter((project) => project.category === 'logo');

  useEffect(() => {
    if (activeLogoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLogoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveLogoIndex((prev) => (prev !== null ? (prev - 1 + logoProjects.length) % logoProjects.length : null));
      } else if (e.key === 'ArrowRight') {
        setActiveLogoIndex((prev) => (prev !== null ? (prev + 1) % logoProjects.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLogoIndex, logoProjects.length]);

  const filters = portfolioFilters.map((filter) => ({
    ...filter,
    count: filter.id === 'all'
      ? projects.length
      : projects.filter((project) => project.category === filter.id).length
  }));
  const activeCategory = filters.find((filter) => filter.id === activeFilter) ?? filters[0];
  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="page portfolio-page" style={{ display: 'block' }}>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="poh-hero">
        <div className="wrap poh-container">
          <div className="poh-hero-layout">
            
            <div className="poh-hero-copy">
              <ScrollReveal direction="up" delay={65}>
                <span className="poh-badge">
                  <span className="poh-badge-dot" />
                  Deployed projects
                </span>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={120}>
                <h1 className="poh-hero-title">
                  Web experiences<br />
                  <span className="poh-hero-title-accent">built and shipped.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <p className="poh-hero-sub">
                  Explore the live projects from our current deployment list. More work will be added as the portfolio grows.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <div className="poh-hero-actions">
                  <a href="#portfolio-work" className="poh-btn-primary">
                    Explore the work <FiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={200} className="poh-summary-wrapper">
              <div className="poh-summary" aria-label="Portfolio overview">
                <div className="poh-summary-card">
                  <div className="poh-summary-card-inner">
                    <span className="poh-summary-icon"><FiBriefcase aria-hidden="true" /></span>
                    <strong>04</strong>
                    <span>Projects shown</span>
                  </div>
                </div>
                <div className="poh-summary-card">
                  <div className="poh-summary-card-inner">
                    <span className="poh-summary-icon"><FiGrid aria-hidden="true" /></span>
                    <strong>04</strong>
                    <span>Industries served</span>
                  </div>
                </div>
                <p className="poh-summary-note">
                  Each project below is included directly from the approved deployed-project list.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* Decorative background grid lines */}
        <div className="poh-hero-grid" aria-hidden="true" />
      </section>

      <section className="portfolio-work" id="portfolio-work">
        <div className="portfolio-filter-shell">
          <div className="wrap portfolio-container portfolio-filter-inner">
            <div><span className="services-section-label">Browse the catalogue</span><strong>{activeCategory.count} projects</strong></div>
            <div className="filter-bar" role="group" aria-label="Filter portfolio projects">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  <span>{filter.label}</span>
                  <small>{filter.count}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="portfolio-grid portfolio-deployed-grid" aria-label={`${activeCategory.label} projects`}>
            {visibleProjects.map((project, index) => {
              const isLogo = project.category === 'logo';
              const logoIndex = isLogo ? logoProjects.findIndex((p) => p.slug === project.slug) : -1;

              return (
                <a
                  key={project.slug}
                  className={`port-card fade-in portfolio-deployed-card ${isLogo ? 'portfolio-logo-card' : ''}`}
                  href={isLogo ? '#show-logo' : project.url}
                  target={isLogo ? '_self' : '_blank'}
                  rel={isLogo ? undefined : 'noopener noreferrer'}
                  onClick={isLogo ? (e) => {
                    e.preventDefault();
                    if (logoIndex !== -1) setActiveLogoIndex(logoIndex);
                  } : undefined}
                  aria-label={isLogo ? `View ${project.title} logo design` : `View ${project.title} live website`}
                >
                  <div
                    className={`card-img ${!isLogo && !project.visual?.includes('/') ? project.visual : ''}`}
                    style={isLogo ? {
                      backgroundColor: '#ffffff',
                      padding: '24px'
                    } : (project.visual?.includes('/')) ? {
                      backgroundImage: `url(${resolveUrl(project.visual)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    } : {}}
                  >
                    {isLogo ? (
                      <img 
                        src={resolveUrl(project.visual)} 
                        alt={project.title} 
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <>
                        <div className="url-bar">{getDisplayUrl(project.url)}</div>
                        <div className="overlay-text">
                          <div className="ot-label">Website for</div>
                          <div className="ot-title">{project.industry}</div>
                          <div className="ot-by">developed by <b>JAC MediaLand</b></div>
                        </div>
                      </>
                    )}
                    <div className="portfolio-project-number">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                  <div className="card-bottom portfolio-project-footer">
                    <div>
                      <h3>{project.title}</h3>
                      <span className={isLogo ? 'logo' : 'dev'}>{isLogo ? 'Logo Design' : 'Development'}</span>
                    </div>
                    {isLogo ? <FiZoomIn aria-hidden="true" /> : <FiExternalLink aria-hidden="true" />}
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="portfolio-empty-state" role="status">
            <span><FiFolder aria-hidden="true" /></span>
            <p className="services-section-label">{activeCategory.label}</p>
            <h2>Projects will be added soon.</h2>
            <p>We&apos;re preparing selected work for this category. Check back as the portfolio grows.</p>
          </div>
        )}
      </section>

      <section className="port-cta-section">
        <div className="wrap port-cta-container">
          <ScrollReveal direction="up" delay={60}>
            <div className="port-cta-card">
              <div className="port-cta-info">
                <span className="port-cta-label">Your project could be next</span>
                <h2 className="port-cta-title">Need work that looks good and solves the right problem?</h2>
                <p className="port-cta-desc">
                  Tell us what you're building, changing, or trying to grow. We'll help shape the right approach.
                </p>
              </div>
              <div className="port-cta-action">
                <Link to="/contact" className="port-cta-btn">
                  Discuss your project <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ────────────────────────────────────── */}
      {activeLogoIndex !== null && logoProjects[activeLogoIndex] && (() => {
        const activeLogo = logoProjects[activeLogoIndex];
        
        const handlePrev = (e: React.MouseEvent) => {
          e.stopPropagation();
          setActiveLogoIndex((prev) => (prev !== null ? (prev - 1 + logoProjects.length) % logoProjects.length : null));
        };

        const handleNext = (e: React.MouseEvent) => {
          e.stopPropagation();
          setActiveLogoIndex((prev) => (prev !== null ? (prev + 1) % logoProjects.length : null));
        };

        return (
          <div 
            className="lightbox-overlay" 
            onClick={() => setActiveLogoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Logo preview gallery"
          >
            <button 
              className="lightbox-close" 
              onClick={() => setActiveLogoIndex(null)}
              aria-label="Close preview"
            >
              <FiX />
            </button>

            <button 
              className="lightbox-nav lightbox-nav-left" 
              onClick={handlePrev}
              aria-label="Previous logo"
            >
              <FiChevronLeft />
            </button>

            <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
              <img 
                src={resolveUrl(activeLogo.visual)} 
                alt={activeLogo.title} 
                className="lightbox-image"
              />
              <div className="lightbox-info">
                <h3>{activeLogo.title}</h3>
                <span className="lightbox-category">{activeLogo.industry} — Logo Design</span>
                <span className="lightbox-counter">Logo {activeLogoIndex + 1} of {logoProjects.length}</span>
              </div>
            </div>

            <button 
              className="lightbox-nav lightbox-nav-right" 
              onClick={handleNext}
              aria-label="Next logo"
            >
              <FiChevronRight />
            </button>
          </div>
        );
      })()}
    </main>
  );
}
