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

// Multer Config for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif|svg\+xml|svg|ico/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images and icons only!'));
    }
  }
});

// Stats Route
router.get('/stats', protect, getDashboardStats);

// File Upload Route
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
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
