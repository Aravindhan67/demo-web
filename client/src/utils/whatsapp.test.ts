import assert from 'node:assert/strict';
import test from 'node:test';
import { createWhatsAppUrl } from './whatsapp.ts';

test('creates an encoded WhatsApp enquiry and omits an empty phone number', () => {
  const url = createWhatsAppUrl({
    name: '  Priya Kumar  ',
    email: ' priya@example.com ',
    phone: '   ',
    subject: ' Website redesign ',
    message: ' We need a faster company website. '
  });

  assert.equal(
    url,
    'https://wa.me/917338891367?text=Hello+JAC+MediaLand%2C%0A%0AI%27d+like+to+discuss+a+project.%0A%0AName%3A+Priya+Kumar%0AEmail%3A+priya%40example.com%0ASubject%3A+Website+redesign%0AMessage%3A+We+need+a+faster+company+website.'
  );
});

test('includes a supplied phone number', () => {
  const url = createWhatsAppUrl({
    name: 'Arun',
    email: 'arun@example.com',
    phone: '+91 98765 43210',
    subject: 'SEO',
    message: 'Please contact me.'
  });

  assert.ok(url.includes('Phone%3A+%2B91+98765+43210'));
});
