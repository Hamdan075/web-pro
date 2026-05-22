const express = require('express');
const router = express.Router();

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

// POST /api/students — Add a new student
router.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/contact — Save contact us message
router.post('/contact', async (req, res) => {
  try {
    const ContactMessage = require('../models/ContactMessage');
    const newMessage = new ContactMessage(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admission — Save admission application
router.post('/admission', async (req, res) => {
  try {
    const AdmissionApplication = require('../models/AdmissionApplication');
    const newApp = new AdmissionApplication(req.body);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

// PUT /api/students/:id — Update a student
router.put('/students/:id', async (req, res) => {
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

// DELETE /api/students/:id — Delete a student
router.delete('/students/:id', async (req, res) => {
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

module.exports = router;

