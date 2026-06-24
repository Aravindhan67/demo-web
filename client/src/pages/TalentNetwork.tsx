import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import TalentNetworkForm from '../components/TalentNetworkForm';

const highlights = [
  'Every application is read by a real person.',
  'We match you as roles open — no repeat applying.',
  'We always respond with a clear update.',
];

export default function TalentNetwork() {
  return (
    <div className="tn-root">

      {/* ── MOBILE TOP BAR (hidden on desktop) ── */}
      <div className="tn-mobile-bar">
        <Link to="/careers" className="tn-mobile-back">
          <FiArrowLeft size={14} />
          Back
        </Link>
        <span className="tn-mobile-brand">JAC MediaLand</span>
      </div>

      {/* ── LEFT PANEL (hidden on mobile) ── */}
      <div className="tn-left">

        {/* Back button */}
        <Link to="/careers" className="tn-back-btn">
          <FiArrowLeft size={15} />
          Back
        </Link>

        <div className="tn-left-content">
          <span className="tn-label">Apply for Jobs</span>

          <h1 className="tn-title">
            Tell us where<br />you can make<br />an impact.
          </h1>

          <p className="tn-desc">
            No open role right now? Share your background once
            and we'll keep you in mind for every future opportunity.
          </p>

          <ul className="tn-list">
            {highlights.map(h => (
              <li key={h}>
                <FiCheckCircle size={15} aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom branding */}
        <div className="tn-brand">JAC MediaLand</div>
      </div>

      {/* ── RIGHT PANEL — Multi-step form ── */}
      <div className="tn-right">
        <div className="tn-right-inner">
          <TalentNetworkForm />
        </div>
      </div>

    </div>
  );
}
