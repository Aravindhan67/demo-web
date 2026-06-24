import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // e.g., 'FaCode', 'FaPaintBrush'
  description: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
