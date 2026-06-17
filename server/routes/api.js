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
const User = require('../models/User');

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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 30px; text-align: center;">
          <img src="cid:schoollogo" alt="Cambridge School Logo" style="height: 70px; margin-bottom: 10px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Cambridge School</h1>
          <p style="color: #cbd5e1; margin: 5px 0 0 0; font-size: 14px;">Contact Us Message Center</p>
        </div>
        <div style="padding: 30px; color: #334155; line-height: 1.6;">
          <h2 style="color: #1e3c72; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Message Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 120px; vertical-align: top;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${savedMessage.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${savedMessage.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${savedMessage.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b; vertical-align: top;">Subject:</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${savedMessage.subject}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message Details</p>
            <div style="color: #334155; font-size: 15px; white-space: pre-wrap;">${savedMessage.message}</div>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0;">This is an automated notification from your Cambridge School Web Portal.</p>
          <p style="margin: 5px 0 0 0;">&copy; 2026 Cambridge School. All rights reserved.</p>
        </div>
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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 30px; text-align: center;">
          <img src="cid:schoollogo" alt="Cambridge School Logo" style="height: 70px; margin-bottom: 10px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Cambridge School</h1>
          <p style="color: #cbd5e1; margin: 5px 0 0 0; font-size: 14px;">Admission Application System</p>
        </div>
        <div style="padding: 30px; color: #334155; line-height: 1.6;">
          <h2 style="color: #1e3c72; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Application Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #64748b; width: 180px; border-bottom: 1px solid #e2e8f0;">Applicant Name:</td>
              <td style="padding: 10px; color: #1e293b; font-weight: 500; border-bottom: 1px solid #e2e8f0;">${savedApp.firstname} ${savedApp.lastname}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">Gender:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.gender}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${savedApp.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${savedApp.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.phone}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">Nationality:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.nationality}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">State:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.state}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">Home Address:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.address}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">How they heard of us:</td>
              <td style="padding: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${savedApp.howKnow}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0;">This is an automated notification from your Cambridge School Web Portal.</p>
          <p style="margin: 5px 0 0 0;">&copy; 2026 Cambridge School. All rights reserved.</p>
        </div>
      </div>
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

// POST /api/auth/register — User Registration
router.post('/auth/register', formLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Sign Token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/user-login — User Login
router.post('/auth/user-login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find User
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Sign Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

