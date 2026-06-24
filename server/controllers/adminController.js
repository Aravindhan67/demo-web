import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Team from '../models/Team.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import Contact from '../models/Contact.js';
import Settings from '../models/Settings.js';
import Program from '../models/Program.js';
import Activity from '../models/Activity.js';

// Helper to log activities
const logActivity = async (action, description) => {
  try {
    await Activity.create({ action, description });
  } catch (error) {
    console.error('Failed to log activity:', error.message);
  }
};

// Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalGallery = await Gallery.countDocuments();
    const totalTeam = await Team.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalBlog = await Blog.countDocuments();
    const totalContacts = await Contact.countDocuments();

    // Recent activities (last 10)
    const recentActivities = await Activity.find().sort({ createdAt: -1 }).limit(10);

    // Monthly Statistics (Mock data based on database or aggregate)
    // We will generate a mock statistics array for charts
    const monthlyStats = [
      { name: 'Jan', projects: 2, contacts: 5, views: 240 },
      { name: 'Feb', projects: 3, contacts: 8, views: 320 },
      { name: 'Mar', projects: 5, contacts: 12, views: 480 },
      { name: 'Apr', projects: totalProjects || 6, contacts: totalContacts || 15, views: 600 },
      { name: 'May', projects: (totalProjects || 6) + 1, contacts: (totalContacts || 15) + 4, views: 750 },
      { name: 'Jun', projects: (totalProjects || 6) + 2, contacts: (totalContacts || 15) + 6, views: 900 }
    ];

    res.json({
      counts: {
        projects: totalProjects,
        gallery: totalGallery,
        team: totalTeam,
        services: totalServices,
        blog: totalBlog,
        contacts: totalContacts
      },
      recentActivities,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Projects CRUD
export const getProjects = async (req, res) => {
  try {
    const data = await Project.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = await Project.create(req.body);
    await logActivity('Create Project', `Project "${data.title}" was created.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Project not found' });
    await logActivity('Update Project', `Project "${data.title}" was updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const data = await Project.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Project not found' });
    await logActivity('Delete Project', `Project "${data.title}" was deleted.`);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Gallery CRUD
export const getGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGallery = async (req, res) => {
  try {
    const data = await Gallery.create(req.body);
    await logActivity('Upload Photo', `Photo "${data.title}" was added to gallery.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const data = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Photo not found' });
    await logActivity('Update Photo', `Photo "${data.title}" details were updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const data = await Gallery.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Photo not found' });
    await logActivity('Delete Photo', `Photo "${data.title}" was deleted from gallery.`);
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Services CRUD
export const getServices = async (req, res) => {
  try {
    const data = await Service.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const data = await Service.create(req.body);
    await logActivity('Create Service', `Service "${data.name}" was created.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const data = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Service not found' });
    await logActivity('Update Service', `Service "${data.name}" was updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const data = await Service.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Service not found' });
    await logActivity('Delete Service', `Service "${data.name}" was deleted.`);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Team CRUD
export const getTeam = async (req, res) => {
  try {
    const data = await Team.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const data = await Team.create(req.body);
    await logActivity('Add Team Member', `Team member "${data.employeeName}" was added.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const data = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Team member not found' });
    await logActivity('Update Team Member', `Team member "${data.employeeName}" details were updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const data = await Team.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Team member not found' });
    await logActivity('Remove Team Member', `Team member "${data.employeeName}" was removed.`);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Blog CRUD
export const getBlogs = async (req, res) => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const data = await Blog.create(req.body);
    await logActivity('Create Blog', `Blog post "${data.title}" was created.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Blog post not found' });
    await logActivity('Update Blog', `Blog post "${data.title}" was updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Blog post not found' });
    await logActivity('Delete Blog', `Blog post "${data.title}" was deleted.`);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Testimonials CRUD
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.create(req.body);
    await logActivity('Add Testimonial', `Testimonial from "${data.clientName}" was added.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Testimonial not found' });
    await logActivity('Update Testimonial', `Testimonial from "${data.clientName}" was updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Testimonial not found' });
    await logActivity('Delete Testimonial', `Testimonial from "${data.clientName}" was deleted.`);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Programs CRUD
export const getPrograms = async (req, res) => {
  try {
    const data = await Program.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProgram = async (req, res) => {
  try {
    const data = await Program.create(req.body);
    await logActivity('Create Program', `Program "${data.title}" was created.`);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const data = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'Program not found' });
    await logActivity('Update Program', `Program "${data.title}" was updated.`);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const data = await Program.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Program not found' });
    await logActivity('Delete Program', `Program "${data.title}" was deleted.`);
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contact Enquiries
export const getContacts = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const data = await Contact.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Enquiry not found' });
    await logActivity('Delete Enquiry', `Enquiry from "${data.name}" was deleted.`);
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportContactsCSV = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    // Construct CSV String
    let csv = 'Name,Email,Mobile Number,Subject,Message,Date\n';
    contacts.forEach(c => {
      const name = `"${(c.name || '').replace(/"/g, '""')}"`;
      const email = `"${(c.email || '').replace(/"/g, '""')}"`;
      const mobile = `"${(c.mobileNumber || '').replace(/"/g, '""')}"`;
      const subject = `"${(c.subject || '').replace(/"/g, '""')}"`;
      const message = `"${(c.message || '').replace(/"/g, '""')}"`;
      const date = `"${c.createdAt ? c.createdAt.toISOString() : ''}"`;
      
      csv += `${name},${email},${mobile},${subject},${message},${date}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contact-enquiries.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    await logActivity('Update Settings', 'Website global settings were updated.');
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
