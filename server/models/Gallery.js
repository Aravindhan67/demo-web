import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  uploadDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
