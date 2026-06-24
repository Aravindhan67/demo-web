import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiFileText, FiSend } from 'react-icons/fi';
import { submitCareerApplication } from '../api/cmsClient';
import { isGeneralCareerOpening } from '../data/careers';
import type { CareerOpeningItem } from '../data/cmsSections';

const acceptedResumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const maxResumeSize = 5 * 1024 * 1024;

type MessageKind = 'idle' | 'progress' | 'error' | 'success';

export default function CareerApplicationForm({ opening }: { opening?: CareerOpeningItem }) {
  const idempotencyKey = useRef(crypto.randomUUID());
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [message, setMessage] = useState('');
  const [messageKind, setMessageKind] = useState<MessageKind>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [resumeName, setResumeName] = useState('');

  useEffect(() => {
    if (messageKind === 'error' || messageKind === 'success') messageRef.current?.focus();
  }, [messageKind]);

  function showMessage(kind: MessageKind, value: string) {
    setMessageKind(kind);
    setMessage(value);
  }

  function validateResume(file?: File): string {
    if (!file?.size) return 'Please attach your resume.';
    if (!acceptedResumeTypes.includes(file.type)) return 'Resume must be a PDF, DOC, or DOCX file.';
    if (file.size > maxResumeSize) return 'Resume must be 5 MB or smaller.';
    return '';
  }

  function selectResume(file?: File) {
    const error = validateResume(file);
    setResumeName(error ? '' : file?.name ?? '');
    if (error) showMessage('error', error);
    else if (messageKind === 'error') showMessage('idle', '');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const resume = data.get('resume');
    const error = validateResume(resume instanceof File ? resume : undefined);
    if (error) return showMessage('error', error);
    if (opening && !isGeneralCareerOpening(opening)) data.set('openingSlug', opening.slug);
    data.set('idempotencyKey', idempotencyKey.current);
    data.set('source', 'careers-website');

    setSubmitting(true);
    showMessage('progress', 'Sending your application...');
    try {
      await submitCareerApplication(data);
      form.reset();
      setComplete(true);
      setResumeName('');
      showMessage('success', 'Application received. Our team will review it and contact you if there is a match.');
    } catch (submissionError) {
      showMessage('error', submissionError instanceof Error ? submissionError.message : 'Could not submit your application.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="career-application-form" onSubmit={submit} aria-busy={submitting}>
      <div className="career-application-heading">
        <span><FiSend aria-hidden="true" /></span>
        <div>
          <span className="services-section-label">{opening && isGeneralCareerOpening(opening) ? 'Apply for jobs' : 'Apply now'}</span>
          <h2>{opening && !isGeneralCareerOpening(opening) ? `Apply for ${opening.title}` : 'Apply for jobs'}</h2>
          <p>Share enough context for us to understand your experience, interests, and the work you want to do next.</p>
        </div>
      </div>
      {!complete && (
        <fieldset className="career-form-fields" disabled={submitting}>
          <legend className="career-form-required">Fields marked <span aria-hidden="true">*</span> are required.</legend>
          <input name="website" tabIndex={-1} autoComplete="off" className="career-honeypot" aria-hidden="true" />
          <div className="career-form-grid">
            <label>Full name <span aria-hidden="true">*</span><input name="name" required maxLength={160} autoComplete="name" /></label>
            <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" required autoComplete="email" /></label>
            <label>Phone number<input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
            <label>Experience<input name="experience" placeholder="Example: 3 years / Fresher" maxLength={160} /></label>
            <label className="career-form-wide">Portfolio or LinkedIn URL <small>Optional</small><input name="profileUrl" type="url" placeholder="https://" autoComplete="url" /></label>
            <label className="career-form-wide">Cover letter <span aria-hidden="true">*</span><textarea name="coverLetter" required minLength={10} maxLength={5000} rows={7} aria-describedby="cover-letter-help" placeholder="Tell us why this opportunity interests you and what you would bring to the team." /><small id="cover-letter-help">A short, thoughtful introduction is enough. Maximum 5,000 characters.</small></label>
            <label className="career-resume-field career-form-wide">
              <span><FiFileText aria-hidden="true" /><strong>Resume *</strong><small id="resume-help">PDF, DOC, or DOCX / Maximum 5 MB</small></span>
              <input name="resume" type="file" required aria-describedby="resume-help" onChange={(event) => selectResume(event.target.files?.[0])} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
              {resumeName && <small className="career-resume-selected">Selected: {resumeName}</small>}
            </label>
          </div>
          <div className="career-form-actions">
            <button className="btn-3d btn-3d-secondary career-submit" disabled={submitting} type="submit">
              <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {submitting ? 'Submitting...' : 'Submit application'} <FiArrowRight aria-hidden="true" />
              </span>
            </button>
            <p>By submitting, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p>
          </div>
        </fieldset>
      )}
      {message && <p ref={messageRef} tabIndex={-1} aria-live="polite" className={`career-form-message ${messageKind}`} role={messageKind === 'error' ? 'alert' : 'status'}>{message}</p>}
    </form>
  );
}
