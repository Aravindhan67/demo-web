export const WHATSAPP_NUMBER = '917338891367';

export interface WhatsAppEnquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function createWhatsAppUrl(enquiry: WhatsAppEnquiry): string {
  const phone = enquiry.phone?.trim();
  const lines = [
    'Hello JAC MediaLand,',
    '',
    "I'd like to discuss a project.",
    '',
    `Name: ${enquiry.name.trim()}`,
    `Email: ${enquiry.email.trim()}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    `Subject: ${enquiry.subject.trim()}`,
    `Message: ${enquiry.message.trim()}`
  ];
  const params = new URLSearchParams({ text: lines.join('\n') });

  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

export function createWhatsAppGreeting(message: string): string {
  const params = new URLSearchParams({ text: message.trim() });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}
