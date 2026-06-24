import { useState, type FormEvent } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhoneCall,
  FiSend
} from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import { createWhatsAppGreeting, createWhatsAppUrl } from '../utils/whatsapp';
import { submitCmsLead } from '../api/cmsClient';
import { useCmsCollection } from '../api/useCmsCollection';
import { fallbackContacts, type ContactItem } from '../data/cmsSections';

export default function Contact() {
  const contacts = fallbackContacts;
  const contact = contacts[0] ?? fallbackContacts[0];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let persisted = true;
    try {
      await submitCmsLead({
        idempotencyKey: crypto.randomUUID(),
        contact: {
          name: formData.name,
          email: formData.email,
          ...(formData.phone.trim() ? { phone: formData.phone } : {})
        },
        fields: {
          subject: formData.subject,
          message: formData.message
        },
        source: {
          route: '/contact'
        }
      });
    } catch {
      persisted = false;
    }
    window.open(createWhatsAppUrl(formData), '_blank', 'noopener,noreferrer');
    setStatus(persisted
      ? 'Your enquiry was saved and WhatsApp opened. Review the prepared message and tap Send to contact us.'
      : 'WhatsApp opened with your enquiry. The CMS was unavailable, so review the prepared message and tap Send to contact us.');
  };

  const scheduleUrl = createWhatsAppGreeting('Hello JAC MediaLand, I would like to schedule an online meeting.');

  return (
    <main className="page contact-page" style={{ display: 'block' }}>
      <section className="contact-hero">
        <div className="wrap contact-container">
          <div className="contact-hero-layout">
            <ScrollReveal direction="up" delay={60}>
              <div className="contact-hero-copy">
                <span className="chip">Connect with us</span>
                <h1>{contact.heroTitle}</h1>
                <p>{contact.heroDescription}</p>
                <div className="contact-expectations" aria-label="What to expect">
                  <span><FiClock aria-hidden="true" />{contact.responseTime}</span>
                  <span><FiMessageCircle aria-hidden="true" />Direct conversation with our team</span>
                  <span><FiCheckCircle aria-hidden="true" />Clear, practical next steps</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={140}>
              <div className="contact-direct-card">
                <span className="contact-direct-label">Prefer a direct conversation?</span>
                <h2>Call or message us.</h2>
                <a href={contact.phoneHref}><FiPhoneCall aria-hidden="true" /><span><small>Call our team</small>{contact.phone}</span></a>
                <a href={`mailto:${contact.email}`}><FiMail aria-hidden="true" /><span><small>Email us</small>{contact.email}</span></a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="wrap contact-container">
          <div className="contact-layout">
            <ScrollReveal direction="up" delay={60}>
              <div className="contact-form-card">
                <div className="contact-section-heading">
                  <span className="services-section-label">Project enquiry</span>
                  <h2>Tell us what you&apos;re working on.</h2>
                  <p>Your details are used only to prepare your WhatsApp enquiry.</p>
                </div>

                {status ? (
                  <div className="contact-success" role="status" aria-live="polite">
                    <FiCheckCircle aria-hidden="true" />
                    <h3>Continue in WhatsApp</h3>
                    <p>{status}</p>
                    <button type="button" className="btn-3d" onClick={() => setStatus('')}>
                      <span className="button_top">Edit enquiry</span>
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-input-row">
                      <label htmlFor="contact-name">Full name *
                        <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                      </label>
                      <label htmlFor="contact-email">Email address *
                        <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="name@example.com" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                      </label>
                    </div>
                    <div className="contact-input-row">
                      <label htmlFor="contact-phone">Phone number
                        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
                      </label>
                      <label htmlFor="contact-subject">Project type *
                        <input id="contact-subject" name="subject" type="text" required placeholder="Website, branding, marketing..." value={formData.subject} onChange={(event) => setFormData({ ...formData, subject: event.target.value })} />
                      </label>
                    </div>
                    <label htmlFor="contact-message">What outcome do you need? *
                      <textarea id="contact-message" name="message" required rows={6} placeholder="Share your goal, current challenge, timeline, or anything useful for our first conversation." value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} />
                    </label>
                    <button type="submit" className="btn-3d btn-3d-secondary contact-submit" style={{ width: '100%' }}>
                      <span className="button_top" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px 28px' }}>
                        Continue in WhatsApp <FiSend aria-hidden="true" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <aside className="contact-sidebar">
              <ScrollReveal direction="up" delay={100}>
                <div className="contact-method-card">
                  <span><FiMapPin aria-hidden="true" /></span>
                  <div><small>Headquarters</small><h3>{contact.city}</h3><p>{contact.address}</p></div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={150}>
                <div className="contact-method-card">
                  <span><FiMail aria-hidden="true" /></span>
                  <div><small>Email</small><h3>Write to our team</h3><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={200}>
                <div className="contact-meeting-card">
                  <span className="services-section-label">Online meeting</span>
                  <h3>Want to talk through the idea?</h3>
                  <p>Start a WhatsApp conversation and we&apos;ll coordinate a suitable meeting time.</p>
                  <a href={scheduleUrl} target="_blank" rel="noopener noreferrer">Schedule a conversation <FiArrowRight aria-hidden="true" /></a>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
