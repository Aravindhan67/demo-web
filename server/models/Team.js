import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  profilePhoto: { type: String },
  employeeName: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String },
  joiningDate: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  message: { type: String },
  socialMediaLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    github: { type: String, default: '' },
    facebook: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
