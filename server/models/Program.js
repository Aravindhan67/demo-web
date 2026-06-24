import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  kind: { type: String, enum: ['active', 'upcoming'], default: 'upcoming' },
  launch: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String },
  imageKey: { type: String },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Program', programSchema);
