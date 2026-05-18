const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Models
const NavLink = require('./models/NavLink');
const MissionVision = require('./models/MissionVision');
const WhySchool = require('./models/WhySchool');
const Testimonial = require('./models/Testimonial');
const FooterContact = require('./models/FooterContact');
const FooterContactNum = require('./models/FooterContactNum');
const AboutPart = require('./models/AboutPart');
const Facility = require('./models/Facility');
const MoreInfo = require('./models/MoreInfo');
const Student = require('./models/Student');
const Program = require('./models/Program');

// ─── Seed Data ──────────────────────────────────────────────

const navLinksData = [
  { id: 'Home', link: '' },
  { id: 'About', link: 'about' },
  { id: 'Facilities', link: 'facility' },
  { id: 'Contact Us', link: 'contact' },
  { id: 'Admission', link: 'apply' },
  { id: 'Student Profile', link: 'student-profile' },
];

const missionVisionData = [
  {
    title: 'Our Mission',
    text: 'At Cambridge School, our mission is to provide a dynamic and inclusive learning environment that fosters academic excellence, creativity, and personal growth. We are dedicated to cultivating a community of learners who are inspired to reach their highest potential and become compassionate global citizens.',
    icon: 'FaAngleDoubleDown',
  },
  {
    title: 'Our Vision',
    text: 'At Cambridge School, our vision is driven by a passion for excellence in education and a dedication to creating a nurturing environment where every student can thrive. We strive to be a beacon of educational innovation, setting new standards for academic excellence and holistic development.',
    icon: 'FaAngleDoubleDown',
  },
];

const whySchoolData = [
  {
    title: 'Good Facilities',
    reason: "We take pride in offering students an exceptional learning environment that is supported by top-notch facilities. We believe that a well-equipped setting is instrumental in enhancing our students' educational experience",
    icon: 'FaSchool',
  },
  {
    title: 'Certificates',
    reason: 'A reason why students should come to our school is the opportunity to earn valuable certificates that can open doors to future success. These certificates are a testament to the diverse skills our students gain during their time with us',
    icon: 'FaCertificate',
  },
  {
    title: 'Conducive Learning',
    reason: "At our school, we pride ourselves on creating a learning environment that is truly conducive to unleashing the full potential of each and every student. We invite you to join our vibrant learning community",
    icon: 'FaChalkboardTeacher',
  },
];

const testimonialsData = [
  {
    name: 'Ali Sadiq',
    testimonial: "I cannot express enough gratitude for the exceptional education I have received at school. The school's nurturing and supportive environment allowed me to flourish both academically and personally. The dedicated teachers and their innovative teaching methods sparked my curiosity and passion for learning",
    image: '/assets/alumni1.jpg',
    icon: 'FaQuoteRight',
  },
  {
    name: 'Afnan Aslam',
    testimonial: 'My time at school has been nothing short of transformative. From the first day I stepped foot on campus, I felt welcomed and supported by the caring staffs and fellow students. I am grateful for the incredible opportunities I had at school, which have prepared me for a bright future in higher education and beyond.',
    image: '/assets/alumni2.jpg',
    icon: 'FaQuoteRight',
  },
  {
    name: 'M Umair',
    testimonial: "I can confidently say that my time at school has been the most enriching and fulfilling experience of my life. The school's emphasis on holistic development helped me not only excel academically but also grow as an individual.",
    image: '/assets/alumni3.jpg',
    icon: 'FaQuoteRight',
  },
];

const footerContactData = [
  { text: 'Liquat Road, Mian Channu, Pakistan' },
];

const footerContactNumData = [
  { icon: 'FaPhone', text: '+92 333 6248969' },
  { icon: 'FaEnvelope', text: 'info@cambridgeschool.edu.pk' },
];

const aboutPartData = [
  {
    image: '/assets/image7.jpg',
    title: 'Programs',
    text: 'Our programs are designed to ignite the spark of curiosity and innovation in students. Through hands-on experiments, projects, and collaborative activities, students explore the fascinating realms of science, technology, engineering, and others.',
  },
  {
    image: '/assets/image8.jpg',
    title: 'Facilities',
    text: "we take pride in providing state-of-the-art facilities that create an ideal environment for holistic learning and growth. Our commitment to excellence extends beyond the classroom, ensuring that every aspect of a student's educational journey is supported.",
  },
  {
    image: '/assets/image9.jpeg',
    title: 'Faculties',
    text: 'Our faculties play a pivotal role in shaping the future of our students. Their unwavering dedication to academic excellence creates an environment where students can thrive and transform into well-rounded individuals ready to make a positive impact on the world.',
  },
];

const facilitiesData = [
  {
    image: '/assets/image8.jpg',
    title: 'School Library',
    text: 'Our extensive library and resource center serve as a hub of knowledge, providing a diverse collection of books, e-books, journals, and multimedia resources. It is a quiet oasis where students can immerse themselves in reading and research.',
  },
  {
    image: '/assets/image10.jpg',
    title: 'Music Room',
    text: 'We recognize the importance of nurturing students\' passion for music. Our music facilities provide a vibrant and inspiring space for students to explore, create, and excel in the world of music.',
  },
  {
    image: '/assets/image11.jpg',
    title: 'Sport Facility',
    text: 'Our school offers a range of sports facilities, including a well-equipped gymnasium, playgrounds, and courts for various sports, encouraging students to stay active and develop a spirit of sportsmanship.',
  },
  {
    image: '/assets/image12.jpg',
    title: 'Computer Lab',
    text: 'We understand the pivotal role technology plays in modern education. Our computer lab facilities are designed to provide students with a cutting-edge learning environment that fosters digital literacy.',
  },
  {
    image: '/assets/image13.jpg',
    title: 'Science Lab',
    text: 'We take immense pride in providing our students with top-notch science lab facilities that are designed to ignite curiosity, foster exploration, and enhance scientific learning.',
  },
  {
    image: '/assets/image14.png',
    title: 'Art Studio',
    text: 'Creativity thrives in our art studios, where students can explore various mediums and unleash their artistic potential. These studios are designed to inspire young artists to express themselves through visual arts.',
  },
  {
    image: '/assets/image15.jpg',
    title: 'Medicare',
    text: 'The well-being of our students is of utmost importance. Our school provides a dedicated medical room and trained staff to attend to any health-related needs and emergencies.',
  },
  {
    image: '/assets/image16.jpg',
    title: 'Multipurpose hall',
    text: 'Our Multipurpose Hall is a hub of creativity, learning, and community engagement, providing numerous benefits and opportunities for our students, faculty, and the broader school community.',
  },
  {
    image: '/assets/image9.jpeg',
    title: 'Modern Classrooms',
    text: 'Our school boasts spacious and well-equipped modern classrooms designed to create an optimal learning environment. Each classroom is thoughtfully arranged to enhance student engagement and foster a collaborative atmosphere.',
  },
];

const moreInfoData = [
  {
    title: 'Housing',
    text: 'We offer safe and comfortable on-campus housing options for students, providing a supportive living environment that fosters community and academic success. Our residential facilities are well-maintained and conveniently located near classrooms and amenities.',
  },
  {
    title: 'Financial Aid',
    text: 'We are committed to making quality education accessible to all. Our financial aid programs include merit-based scholarships, need-based grants, and flexible payment plans to help ease the financial burden and ensure every student has the opportunity to succeed.',
  },
  {
    title: 'Tuition',
    text: 'Our tuition fees are competitively structured to deliver exceptional value for a world-class education. We offer transparent pricing with no hidden costs, along with installment options to make managing educational expenses straightforward and stress-free.',
  },
  {
    title: 'Immigration',
    text: 'Our dedicated immigration support team assists international students with visa applications, documentation, and compliance requirements. We guide you through every step of the process to ensure a smooth transition to studying at our institution.',
  },
];

const studentsData = [
  {
    name: 'Ahmed Ali',
    rollNo: 1,
    class: 10,
    section: 'A',
    fatherName: 'Muhammad Ali',
    dateOfBirth: '2010-05-15',
    gender: 'Male',
    phone: '+92 333 1234567',
    email: 'ahmed.ali@cambridge.edu.pk',
    address: 'House #12, Street 5, Mian Channu',
    admissionDate: '2020-04-01',
    bloodGroup: 'B+',
    photo: null,
    attendance: 92,
    grades: {
      English: 'A',
      Mathematics: 'A+',
      Science: 'A',
      Urdu: 'B+',
      Islamiat: 'A',
      'Computer Science': 'A+',
    },
    achievements: [
      '1st Position in Science Fair 2025',
      'Best Student Award 2024',
      'Cricket Team Captain',
    ],
  },
];

// ─── Seed Function ──────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      NavLink.deleteMany({}),
      MissionVision.deleteMany({}),
      WhySchool.deleteMany({}),
      Testimonial.deleteMany({}),
      FooterContact.deleteMany({}),
      FooterContactNum.deleteMany({}),
      AboutPart.deleteMany({}),
      Facility.deleteMany({}),
      MoreInfo.deleteMany({}),
      Student.deleteMany({}),
      Program.deleteMany({}),
    ]);

    // Insert all data
    console.log('📦 Inserting seed data...');

    await NavLink.insertMany(navLinksData);
    console.log('  ✓ NavLinks seeded');

    await MissionVision.insertMany(missionVisionData);
    console.log('  ✓ MissionVision seeded');

    await WhySchool.insertMany(whySchoolData);
    console.log('  ✓ WhySchool seeded');

    await Testimonial.insertMany(testimonialsData);
    console.log('  ✓ Testimonials seeded');

    await FooterContact.insertMany(footerContactData);
    console.log('  ✓ FooterContact seeded');

    await FooterContactNum.insertMany(footerContactNumData);
    console.log('  ✓ FooterContactNum seeded');

    await AboutPart.insertMany(aboutPartData);
    console.log('  ✓ AboutParts seeded');

    await Facility.insertMany(facilitiesData);
    console.log('  ✓ Facilities seeded');

    await MoreInfo.insertMany(moreInfoData);
    console.log('  ✓ MoreInfo seeded');

    await Student.insertMany(studentsData);
    console.log('  ✓ Students seeded');

    // Load programs from db.json
    const dbJsonPath = path.join(__dirname, '..', 'data', 'db.json');
    if (fs.existsSync(dbJsonPath)) {
      const dbJson = JSON.parse(fs.readFileSync(dbJsonPath, 'utf-8'));
      if (dbJson.undergraduatePrograms) {
        await Program.insertMany(dbJson.undergraduatePrograms);
        console.log(`  ✓ Programs seeded (${dbJson.undergraduatePrograms.length} programs)`);
      }
    } else {
      console.log('  ⚠ db.json not found, skipping programs seed');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
