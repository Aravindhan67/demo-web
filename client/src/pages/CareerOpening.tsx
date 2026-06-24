import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiCalendar, FiCheck, FiMapPin } from 'react-icons/fi';
import CareerApplicationForm from '../components/CareerApplicationForm';
import ScrollReveal from '../components/ScrollReveal';
import { useCmsCollectionState } from '../api/useCmsCollection';
import { isCareerOpeningAcceptingApplications, isGeneralCareerOpening } from '../data/careers';
import { fallbackCareerOpenings, type CareerOpeningItem } from '../data/cmsSections';
import NotFound from './NotFound';

export default function CareerOpening() {
  const { slug = '' } = useParams();
  const { items: openings, loading } = { items: fallbackCareerOpenings, loading: false };
  const opening = openings.find((item) => item.slug === slug);
  if (loading) {
    return (
      <main className="page career-opening-page" style={{ display: 'block' }} aria-busy="true">
        <section className="career-opening-loading"><div className="wrap careers-container"><span className="chip">Loading opportunity</span><h1>Getting the role details ready...</h1></div></section>
      </main>
    );
  }
  if (!opening) return <NotFound />;
  const accepting = isCareerOpeningAcceptingApplications(opening);
  const general = isGeneralCareerOpening(opening);

  return (
    <main className="page career-opening-page" style={{ display: 'block' }}>
      <section className="career-opening-hero">
        <div className="wrap careers-container">
          <Link className="service-detail-back" to="/careers"><FiArrowLeft aria-hidden="true" />All opportunities</Link>
          <div className="career-opening-hero-layout">
            <ScrollReveal direction="up" delay={60}>
              <div>
                <span className="chip">{opening.department || 'Careers at JAC MediaLand'}</span>
                <h1>{opening.title}</h1>
                <p>{opening.description}</p>
                <div className="career-opening-meta">
                  <span><FiMapPin aria-hidden="true" />{opening.location}</span>
                  <span><FiBriefcase aria-hidden="true" />{opening.employmentType}{opening.workplaceType ? ` / ${opening.workplaceType}` : ''}</span>
                  {opening.closingDate && <span><FiCalendar aria-hidden="true" />Apply by {new Date(`${opening.closingDate}T00:00:00`).toLocaleDateString()}</span>}
                </div>
              </div>
            </ScrollReveal>
            <aside className="career-opening-summary">
              <span>{accepting ? 'Applications open' : 'Applications closed'}</span>
              <strong>{opening.salary || 'Compensation discussed during the process'}</strong>
              {accepting ? (
                <a className="btn-3d btn-3d-secondary" href="#apply">
                  <span className="button_top">{general ? 'Introduce yourself' : 'Apply for this opportunity'}</span>
                </a>
              ) : (
                <Link className="btn-3d btn-3d-secondary" to="/careers">
                  <span className="button_top">See other opportunities</span>
                </Link>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="career-opening-content">
        <div className="wrap careers-container career-opening-content-grid">
          <CareerList title="What you will do" items={opening.responsibilities} />
          <CareerList title="What we are looking for" items={opening.requirements} />
          <CareerList title="What you can expect" items={opening.benefits} />
        </div>
      </section>

      <section className="career-apply-section" id="apply">
        <div className="wrap careers-container">
          {accepting ? <CareerApplicationForm opening={opening} /> : (
            <div className="career-closed-card">
              <h2>This opportunity is no longer accepting applications.</h2>
              <p>Explore other openings or apply for jobs for future opportunities.</p>
              <Link className="btn-3d btn-3d-secondary" to="/careers">
                <span className="button_top">View careers</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CareerList({ title, items = [] }: { title: string; items?: string[] }) {
  if (!items.length) return null;
  return <article className="career-opening-list"><h2>{title}</h2><ul>{items.map((item) => <li key={item}><FiCheck aria-hidden="true" />{item}</li>)}</ul></article>;
}
