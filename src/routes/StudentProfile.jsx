

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { searchStudents, deleteStudent } from "../api";
import { AuthContext } from "../context/AuthContext";
import { 
  FaUserGraduate, 
  FaSearch, 
  FaIdBadge, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaPhone, 
  FaEnvelope, 
  FaTrophy, 
  FaChartLine, 
  FaUserPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaCheckCircle, 
  FaExclamationCircle 
} from "react-icons/fa";

const StudentProfile = () => {
  const [searchName, setSearchName] = useState("");
  const [searchRollNo, setSearchRollNo] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({ success: false, error: null });

  const { isAdmin } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchName && !searchRollNo && !searchClass) return;

    setIsSearching(true);
    try {
      const results = await searchStudents({
        name: searchName,
        rollNo: searchRollNo,
        class: searchClass,
      });
      setFoundStudent(results.length > 0 ? results[0] : null);
      setSearched(true);
    } catch (err) {
      console.error('Failed to search students:', err);
      setFoundStudent(null);
      setSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSearchRollNo("");
    setSearchClass("");
    setFoundStudent(null);
    setSearched(false);
    setDeleteStatus({ success: false, error: null });
  };

  const handleDelete = async () => {
    if (!foundStudent) return;
    if (!window.confirm(`Are you sure you want to delete ${foundStudent.name}?`)) {
      return;
    }

    try {
      await deleteStudent(foundStudent._id);
      setDeleteStatus({ success: true, error: null });
      
      // Clear found student and notification after delay
      setTimeout(() => {
        setFoundStudent(null);
        setSearched(false);
        setDeleteStatus({ success: false, error: null });
      }, 3000);
    } catch (err) {
      console.error('Failed to delete student:', err);
      setDeleteStatus({ success: false, error: err.message });
    }
  };

  // Grades come from MongoDB as a Map-like object — normalize it
  const getGrades = (student) => {
    if (!student?.grades) return {};
    // Mongoose Map serializes to a plain object
    return typeof student.grades === 'object' ? student.grades : {};
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="pages student-hero">
        <FaUserGraduate className="student-hero-icon" />
        <p className="title">Student Profile</p>
        <p className="student-hero-sub">Search and view student information</p>
      </div>

      {/* Search Section */}
      <section className="student-search-section">
        <div className="student-search-card">
          <div className="search-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <FaSearch className="search-header-icon" />
              <h2>Find Student</h2>
              <p>Enter student details to search</p>
            </div>
            {isAdmin && (
              <a href="/add-student" style={{ 
                backgroundColor: 'var(--brand)', 
                color: 'white', 
                padding: '0.8rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--text-color)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--brand)'}
              >
                <FaUserPlus /> Add New Student
              </a>
            )}
          </div>

          <form onSubmit={handleSearch} className="student-search-form">
            <div className="search-fields">
              <div className="search-field">
                <label htmlFor="search-name">
                  <FaUserGraduate /> Student Name
                </label>
                <input
                  type="text"
                  id="search-name"
                  placeholder="e.g. Ahmed Ali"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label htmlFor="search-roll">
                  <FaIdBadge /> Roll Number
                </label>
                <input
                  type="number"
                  id="search-roll"
                  placeholder="e.g. 99"
                  value={searchRollNo}
                  onChange={(e) => setSearchRollNo(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label htmlFor="search-class">
                  <FaBookOpen /> Class
                </label>
                <input
                  type="number"
                  id="search-class"
                  placeholder="e.g. 10"
                  value={searchClass}
                  onChange={(e) => setSearchClass(e.target.value)}
                />
              </div>
            </div>

            <div className="search-actions">
              <button type="submit" className="search-btn" disabled={isSearching}>
                {isSearching ? (
                  <span className="search-spinner"></span>
                ) : (
                  <FaSearch />
                )}
                {isSearching ? "Searching..." : "Search Student"}
              </button>
              <button type="button" className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section className="student-result-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {deleteStatus.error && (
            <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto 1.5rem', backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              <FaExclamationCircle /> {deleteStatus.error}
            </div>
          )}

          {deleteStatus.success ? (
            <div style={{ width: '100%', maxWidth: '850px', backgroundColor: '#d4edda', color: '#155724', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontWeight: 500, fontSize: '1.2rem', boxShadow: '0 15px 50px rgba(0,0,0,0.08)' }}>
              <FaCheckCircle style={{ fontSize: '3rem', color: '#28a745' }} />
              <span>Student successfully deleted. Resetting search...</span>
            </div>
          ) : foundStudent ? (
            <div className="profile-card-container">
              {/* Profile Header */}
              <div className="profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
                  <div className="profile-avatar">
                    <FaUserGraduate />
                  </div>
                  <div className="profile-header-info">
                    <h1>{foundStudent.name}</h1>
                    <div className="profile-badges">
                      <span className="badge badge-class">Class {foundStudent.class}-{foundStudent.section}</span>
                      <span className="badge badge-roll">Roll No: {foundStudent.rollNo}</span>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="profile-actions" style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/edit-student/${foundStudent._id}`} style={{ 
                      padding: '0.6rem 1.2rem', 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button onClick={handleDelete} style={{ 
                      padding: '0.6rem 1.2rem', 
                      backgroundColor: '#dc2626', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Body */}
              <div className="profile-body">
                {/* Personal Info */}
                <div className="profile-section">
                  <h3 className="section-title">
                    <FaUserGraduate /> Personal Information
                  </h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Father's Name</span>
                      <span className="info-value">{foundStudent.fatherName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date of Birth</span>
                      <span className="info-value">
                        <FaCalendarAlt /> {new Date(foundStudent.dateOfBirth).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Gender</span>
                      <span className="info-value">{foundStudent.gender}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Blood Group</span>
                      <span className="info-value">{foundStudent.bloodGroup}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone</span>
                      <span className="info-value"><FaPhone /> {foundStudent.phone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value"><FaEnvelope /> {foundStudent.email}</span>
                    </div>
                    <div className="info-item full-width">
                      <span className="info-label">Address</span>
                      <span className="info-value">{foundStudent.address}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Admission Date</span>
                      <span className="info-value">{new Date(foundStudent.admissionDate).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                  </div>
                </div>

                {/* Attendance */}
                <div className="profile-section">
                  <h3 className="section-title">
                    <FaChartLine /> Attendance
                  </h3>
                  <div className="attendance-bar-container">
                    <div className="attendance-bar">
                      <div
                        className="attendance-fill"
                        style={{ width: `${foundStudent.attendance}%` }}
                      >
                        <span>{foundStudent.attendance}%</span>
                      </div>
                    </div>
                    <p className="attendance-status">
                      {foundStudent.attendance >= 90
                        ? " Excellent Attendance"
                        : foundStudent.attendance >= 75
                          ? " Good Attendance"
                          : " Needs Improvement"}
                    </p>
                  </div>
                </div>

                {/* Grades */}
                <div className="profile-section">
                  <h3 className="section-title">
                    <FaBookOpen /> Academic Grades
                  </h3>
                  <div className="grades-grid">
                    {Object.entries(getGrades(foundStudent)).map(([subject, grade]) => (
                      <div className="grade-card" key={subject}>
                        <span className="grade-subject">{subject}</span>
                        <span className={`grade-value grade-${grade.replace("+", "plus")}`}>{grade}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="profile-section">
                  <h3 className="section-title">
                    <FaTrophy /> Achievements
                  </h3>
                  <div className="achievements-list">
                    {foundStudent.achievements?.map((ach, i) => (
                      <div className="achievement-item" key={i}>
                        <FaTrophy className="achievement-icon" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-result-card">
              <div className="no-result-icon">🔍</div>
              <h2>No Student Found</h2>
              <p>We couldn't find any student matching the provided details. Please check the information and try again.</p>
              <button className="search-btn" onClick={handleReset}>Try Again</button>
            </div>
          )}
        </section>
      )}

      <Footer />
    </>
  );
};

export default StudentProfile;
