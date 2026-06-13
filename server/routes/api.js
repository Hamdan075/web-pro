const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NavLink = require('../models/NavLink');
const MissionVision = require('../models/MissionVision');
const WhySchool = require('../models/WhySchool');
const Testimonial = require('../models/Testimonial');
const FooterContact = require('../models/FooterContact');
const FooterContactNum = require('../models/FooterContactNum');
const AboutPart = require('../models/AboutPart');
const Facility = require('../models/Facility');
const MoreInfo = require('../models/MoreInfo');
const Student = require('../models/Student');
const Program = require('../models/Program');
const Admin = require('../models/Admin');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const verifyToken = require('../middleware/auth');
const { loginLimiter, formLimiter } = require('../middleware/rateLimiter');
const { sendEmailNotification } = require('../utils/emailNotifier');

// GET /api/navlinks
router.get('/navlinks', async (req, res) => {
  try {
    const data = await NavLink.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/mission-vision
router.get('/mission-vision', async (req, res) => {
  try {
    const data = await MissionVision.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/why-school
router.get('/why-school', async (req, res) => {
  try {
    const data = await WhySchool.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const data = await Testimonial.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/footer-contact
router.get('/footer-contact', async (req, res) => {
  try {
    const data = await FooterContact.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/footer-contact-num
router.get('/footer-contact-num', async (req, res) => {
  try {
    const data = await FooterContactNum.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/about-parts
router.get('/about-parts', async (req, res) => {
  try {
    const data = await AboutPart.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/facilities
router.get('/facilities', async (req, res) => {
  try {
    const data = await Facility.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/more-info
router.get('/more-info', async (req, res) => {
  try {
    const data = await MoreInfo.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students — search by name, rollNo, class
router.get('/students', async (req, res) => {
  try {
    const { name, rollNo, class: studentClass } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (rollNo) {
      filter.rollNo = parseInt(rollNo);
    }
    if (studentClass) {
      filter.class = parseInt(studentClass);
    }

    const data = await Student.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/students — Add a new student (Protected)
router.post('/students', verifyToken, async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/contact — Save contact us message
router.post('/contact', formLimiter, async (req, res) => {
  try {
    const ContactMessage = require('../models/ContactMessage');
    const newMessage = new ContactMessage(req.body);
    const savedMessage = await newMessage.save();

    // Send email notification (async)
    const emailSubject = `New Contact Message: ${savedMessage.subject}`;
    const emailHtml = `
      <h2>New Contact Us Message Received</h2>
      <hr/>
      <p><strong>Name:</strong> ${savedMessage.name}</p>
      <p><strong>Email:</strong> ${savedMessage.email}</p>
      <p><strong>Subject:</strong> ${savedMessage.subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f8f9fb; padding: 15px; border-radius: 8px; border: 1px solid #e1e5ea; color: #333;">
        ${savedMessage.message.replace(/\n/g, '<br/>')}
      </div>
    `;
    sendEmailNotification(emailSubject, emailHtml);

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admission — Save admission application
router.post('/admission', formLimiter, async (req, res) => {
  try {
    const AdmissionApplication = require('../models/AdmissionApplication');
    const newApp = new AdmissionApplication(req.body);
    const savedApp = await newApp.save();

    // Send email notification (async)
    const emailSubject = `New Admission Application: ${savedApp.firstname} ${savedApp.lastname}`;
    const emailHtml = `
      <h2>New Admission Application Received</h2>
      <hr/>
      <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; color: #333;">
        <tr style="background: #f8f9fb;"><td style="padding: 8px; font-weight: bold; width: 180px; border-bottom: 1px solid #eee;">Applicant Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.firstname} ${savedApp.lastname}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Gender:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.gender}</td></tr>
        <tr style="background: #f8f9fb;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone Number:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.phone}</td></tr>
        <tr style="background: #f8f9fb;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Nationality:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.nationality}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">State:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.state}</td></tr>
        <tr style="background: #f8f9fb;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Home Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.address}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">How they heard of us:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${savedApp.howKnow}</td></tr>
      </table>
    `;
    sendEmailNotification(emailSubject, emailHtml);

    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/newsletter/subscribe — Subscribe to newsletter
router.post('/newsletter/subscribe', formLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'You are already subscribed to our newsletter' });
    }

    const newSubscriber = new NewsletterSubscriber({ email: email.toLowerCase() });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/site-data (Unified Endpoint)
router.get('/site-data', async (req, res) => {
  try {
    const [
      navLinks, missionVision, whySchool, testimonials,
      footerContact, footerContactNum, aboutParts, facilities, moreInfo
    ] = await Promise.all([
      NavLink.find(), MissionVision.find(), WhySchool.find(), Testimonial.find(),
      FooterContact.find(), FooterContactNum.find(), AboutPart.find(), Facility.find(), MoreInfo.find()
    ]);

    res.json({
      navLinks, missionVision, whySchool, testimonials,
      footerContact, footerContactNum, aboutParts, facilities, moreInfo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/programs
router.get('/programs', async (req, res) => {
  try {
    const data = await Program.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/:id — Get a single student by id
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:id — Update a student (Protected)
router.put('/students/:id', verifyToken, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/students/:id — Delete a student (Protected)
router.delete('/students/:id', verifyToken, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login — Admin Login
router.post('/auth/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find Admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Sign Token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

