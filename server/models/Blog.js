import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  featuredImage: { type: String },
  category: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Draft' }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
