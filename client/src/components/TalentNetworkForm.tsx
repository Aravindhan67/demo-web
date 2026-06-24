import { useState, useRef, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiArrowRight, FiUser, FiBriefcase,
  FiFileText, FiUpload, FiCheckCircle, FiSend, FiX,
} from 'react-icons/fi';
import { submitCareerApplication } from '../api/cmsClient';

/* ─── Step config ─────────────────────────────────────── */
const STEPS = [
  { id: 'personal',   label: 'Personal',   icon: FiUser,      hint: 'Who are you?' },
  { id: 'experience', label: 'Experience', icon: FiBriefcase, hint: 'Your background' },
  { id: 'letter',     label: 'Letter',     icon: FiFileText,  hint: 'Your story' },
  { id: 'resume',     label: 'Resume',     icon: FiUpload,    hint: 'Your document' },
];

const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_SIZE = 5 * 1024 * 1024;

type Fields = {
  name: string; email: string; phone: string;
  experience: string; profileUrl: string;
  coverLetter: string; resume: File | null;
};
const EMPTY: Fields = {
  name: '', email: '', phone: '',
  experience: '', profileUrl: '',
  coverLetter: '', resume: null,
};

/* ─── Floating label input ────────────────────────────── */
function FloatInput({
  label, name, type = 'text', value, onChange, required, placeholder = ' ', autoComplete,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  placeholder?: string; autoComplete?: string;
}) {
  return (
    <div className="tnf2-field">
      <input
        className="tnf2-input"
        id={`tnf-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
      />
      <label className="tnf2-float-label" htmlFor={`tnf-${name}`}>
        {label}{required && <span aria-hidden> *</span>}
      </label>
    </div>
  );
}

/* ─── Main form ───────────────────────────────────────── */
export default function TalentNetworkForm() {
  const [step, setStep]         = useState(0);
  const [dir, setDir]           = useState<1 | -1>(1);
  const [animKey, setAnimKey]   = useState(0);
  const [fields, setFields]     = useState<Fields>(EMPTY);
  const [error, setError]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]         = useState(false);
  const idKey = useRef(crypto.randomUUID());

  const set = useCallback((k: keyof Fields, v: string | File | null) => {
    setFields(f => ({ ...f, [k]: v }));
    setError('');
  }, []);

  function validate(): string {
    if (step === 0) {
      if (!fields.name.trim())  return 'Full name is required.';
      if (!fields.email.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
        return 'Enter a valid email address.';
    }
    if (step === 2 && !fields.coverLetter.trim())
      return 'Please write a short cover letter.';
    if (step === 3) {
      if (!fields.resume) return 'Please attach your resume.';
      if (!ACCEPTED_MIME.includes(fields.resume.type))
        return 'Resume must be a PDF, DOC, or DOCX file.';
      if (fields.resume.size > MAX_SIZE)
        return 'Resume must be 5 MB or smaller.';
    }
    return '';
  }

  function advance(delta: 1 | -1) {
    if (delta === 1) {
      const err = validate();
      if (err) { setError(err); return; }
    }
    setDir(delta);
    setAnimKey(k => k + 1);
    setStep(s => s + delta);
    setError('');
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.set('name',         fields.name);
      data.set('email',        fields.email);
      data.set('phone',        fields.phone);
      data.set('experience',   fields.experience);
      data.set('profileUrl',   fields.profileUrl);
      data.set('coverLetter',  fields.coverLetter);
      if (fields.resume) data.set('resume', fields.resume);
      data.set('idempotencyKey', idKey.current);
      data.set('source',       'careers-website');
      await submitCareerApplication(data);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success ─────────────────────────────────────────── */
  if (done) {
    return (
      <div className="tnf2-success">
        <div className="tnf2-success-check">
          <FiCheckCircle strokeWidth={1.5} />
        </div>
        <div className="tnf2-success-text">
          <h2>Application<br />received.</h2>
          <p>
            Our team will carefully review your profile.<br />
            We'll reach out when there's a match.
          </p>
          <Link to="/careers" className="tnf2-back-careers">
            <FiArrowLeft size={14} />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  /* ── Progress ─────────────────────────────────────────── */
  const pct = (step / STEPS.length) * 100;

  return (
    <form className="tnf2-form" onSubmit={submit} noValidate>

      {/* ── Step sidebar indicators ─────────────────────── */}
      <div className="tnf2-sidebar">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const state = i < step ? 'done' : i === step ? 'active' : 'idle';
          return (
            <div key={s.id} className={`tnf2-sidebar-item tnf2-sidebar-${state}`}>
              <div className="tnf2-sidebar-icon">
                {i < step ? <FiCheckCircle strokeWidth={2} /> : <Icon strokeWidth={1.8} />}
              </div>
              <div className="tnf2-sidebar-meta">
                <span className="tnf2-sidebar-num">0{i + 1}</span>
                <span className="tnf2-sidebar-label">{s.label}</span>
                <span className="tnf2-sidebar-hint">{s.hint}</span>
              </div>
              {i < STEPS.length - 1 && <div className="tnf2-sidebar-line" />}
            </div>
          );
        })}
      </div>

      {/* ── Main content ───────────────────────────────── */}
      <div className="tnf2-main">

        {/* Top progress strip */}
        <div className="tnf2-progress">
          <div className="tnf2-progress-bar" style={{ width: `${pct}%` }} />
        </div>

        {/* Step panel */}
        <div
          className={`tnf2-panel tnf2-panel-${dir > 0 ? 'fwd' : 'bwd'}`}
          key={animKey}
        >
          {/* ── Step 0 ── Personal ───────────────────── */}
          {step === 0 && (
            <div className="tnf2-step">
              <header className="tnf2-step-header">
                <span className="tnf2-step-count">01 / 04</span>
                <h2>Let's start with <em>who you are.</em></h2>
                <p>We need a way to reach you and put a name to the conversation.</p>
              </header>
              <div className="tnf2-inputs">
                <FloatInput label="Full name" name="name" value={fields.name}
                  onChange={v => set('name', v)} required autoComplete="name" />
                <FloatInput label="Email address" name="email" type="email"
                  value={fields.email} onChange={v => set('email', v)}
                  required autoComplete="email" />
                <FloatInput label="Phone number" name="phone" type="tel"
                  value={fields.phone} onChange={v => set('phone', v)}
                  autoComplete="tel" />
              </div>
            </div>
          )}

          {/* ── Step 1 ── Experience ─────────────────── */}
          {step === 1 && (
            <div className="tnf2-step">
              <header className="tnf2-step-header">
                <span className="tnf2-step-count">02 / 04</span>
                <h2>Tell us about your <em>experience.</em></h2>
                <p>Both fields are optional — share what feels relevant.</p>
              </header>
              <div className="tnf2-inputs">
                <FloatInput label="Years of experience or level"
                  name="experience" value={fields.experience}
                  onChange={v => set('experience', v)}
                  placeholder=" " />
                <div className="tnf2-field">
                  <input
                    className="tnf2-input"
                    id="tnf-profileUrl"
                    name="profileUrl"
                    type="url"
                    placeholder=" "
                    autoComplete="url"
                    value={fields.profileUrl}
                    onChange={e => set('profileUrl', e.target.value)}
                  />
                  <label className="tnf2-float-label" htmlFor="tnf-profileUrl">
                    Portfolio or LinkedIn URL
                  </label>
                </div>
                <p className="tnf2-hint-text">
                  e.g. &nbsp;<code>https://linkedin.com/in/yourname</code>&nbsp; or your personal site.
                </p>
              </div>
            </div>
          )}

          {/* ── Step 2 ── Cover letter ───────────────── */}
          {step === 2 && (
            <div className="tnf2-step">
              <header className="tnf2-step-header">
                <span className="tnf2-step-count">03 / 04</span>
                <h2>Introduce <em>yourself.</em></h2>
                <p>Tell us why JAC MediaLand and what you'd bring to the team.</p>
              </header>
              <div className="tnf2-inputs">
                <div className="tnf2-field tnf2-field-full">
                  <textarea
                    className="tnf2-input tnf2-textarea"
                    id="tnf-coverLetter"
                    name="coverLetter"
                    placeholder=" "
                    maxLength={5000}
                    rows={9}
                    value={fields.coverLetter}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      set('coverLetter', e.target.value)}
                    required
                  />
                  <label className="tnf2-float-label" htmlFor="tnf-coverLetter">
                    Cover letter <span aria-hidden>*</span>
                  </label>
                </div>
                <div className="tnf2-counter-row">
                  <span className="tnf2-counter-hint">A short, thoughtful intro is enough.</span>
                  <span className="tnf2-counter">{fields.coverLetter.length}<em> / 5,000</em></span>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3 ── Resume ─────────────────────── */}
          {step === 3 && (
            <div className="tnf2-step">
              <header className="tnf2-step-header">
                <span className="tnf2-step-count">04 / 04</span>
                <h2>Attach your <em>resume.</em></h2>
                <p>PDF, DOC, or DOCX — maximum 5 MB.</p>
              </header>
              <div className="tnf2-inputs">
                <label className={`tnf2-drop ${fields.resume ? 'tnf2-drop-filled' : ''}`}>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const f = e.target.files?.[0] ?? null;
                      set('resume', f);
                    }}
                  />
                  {fields.resume ? (
                    <div className="tnf2-drop-file">
                      <FiCheckCircle size={22} />
                      <div>
                        <strong>{fields.resume.name}</strong>
                        <span>{(fields.resume.size / 1024).toFixed(0)} KB · Click to change</span>
                      </div>
                      <button
                        type="button"
                        className="tnf2-drop-remove"
                        onClick={e => { e.preventDefault(); set('resume', null); }}
                        aria-label="Remove file"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="tnf2-drop-empty">
                      <span className="tnf2-drop-icon"><FiUpload size={32} /></span>
                      <strong>Click to choose file</strong>
                      <span>PDF, DOC, or DOCX · Max 5 MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}
        </div>

        {/* ── Error ──────────────────────────────────── */}
        {error && (
          <div className="tnf2-error" role="alert">
            <FiX size={13} />
            {error}
          </div>
        )}

        {/* ── Nav ────────────────────────────────────── */}
        <div className="tnf2-nav">
          {step > 0 ? (
            <button type="button" className="tnf2-btn-back" onClick={() => advance(-1)}>
              <FiArrowLeft size={15} />
              Back
            </button>
          ) : <span />}

          {step < STEPS.length - 1 ? (
            <button type="button" className="tnf2-btn-next" onClick={() => advance(1)}>
              Continue
              <FiArrowRight size={15} />
            </button>
          ) : (
            <button type="submit" className="tnf2-btn-submit" disabled={submitting}>
              {submitting
                ? <><span className="tnf2-spinner" /> Submitting…</>
                : <><FiSend size={14} /> Submit application</>
              }
            </button>
          )}
        </div>

      </div>
    </form>
  );
}
