import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/auth.js';
import {
  getDashboardStats,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  getServices,
  createService,
  updateService,
  deleteService,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getContacts,
  deleteContact,
  exportContactsCSV,
  getSettings,
  updateSettings,
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram
} from '../controllers/adminController.js';

const router = express.Router();

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Config for File Uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jac_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
    // Note: Cloudinary restricts some formats like svg/ico for security by default unless configured in their dashboard.
  }
});

const upload = multer({ storage });

// Stats Route
router.get('/stats', protect, getDashboardStats);

// File Upload Route
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // req.file.path will hold the secure Cloudinary URL (https://...)
  const fileUrl = req.file.path;
  res.status(201).json({ url: fileUrl });
});

// Projects
router.route('/projects')
  .get(getProjects)
  .post(protect, createProject);
router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Gallery
router.route('/gallery')
  .get(getGallery)
  .post(protect, createGallery);
router.route('/gallery/:id')
  .put(protect, updateGallery)
  .delete(protect, deleteGallery);

// Services
router.route('/services')
  .get(getServices)
  .post(protect, createService);
router.route('/services/:id')
  .put(protect, updateService)
  .delete(protect, deleteService);

// Team
router.route('/team')
  .get(getTeam)
  .post(protect, createTeam);
router.route('/team/:id')
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

// Blogs
router.route('/blogs')
  .get(getBlogs)
  .post(protect, createBlog);
router.route('/blogs/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

// Testimonials
router.route('/testimonials')
  .get(getTestimonials)
  .post(protect, createTestimonial);
router.route('/testimonials/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

// Contact Enquiries
router.route('/contacts')
  .get(protect, getContacts);
router.route('/contacts/:id')
  .delete(protect, deleteContact);
router.get('/contacts-export', protect, exportContactsCSV);

// Settings
router.route('/settings')
  .get(getSettings)
  .put(protect, updateSettings);

// Programs
router.route('/programs')
  .get(getPrograms)
  .post(protect, createProgram);
router.route('/programs/:id')
  .put(protect, updateProgram)
  .delete(protect, deleteProgram);

export default router;
