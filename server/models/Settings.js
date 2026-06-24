import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  logoUrl: { type: String, default: '' },
  faviconUrl: { type: String, default: '' },
  companyName: { type: String, default: 'JAC MediaLand' },
  email: { type: String, default: 'contact@jacmedialand.com' },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  socialMediaLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  footerContent: { type: String, default: '© 2026 JAC MediaLand. All rights reserved.' }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
