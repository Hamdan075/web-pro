import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaSearch, FaUserCircle, FaGraduationCap, FaMedal, FaClipboardList, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './StudentProfile.css';
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
  FaExclamationCircle,
  FaArrowLeft
} from "react-icons/fa";

const StudentProfile = () => {
  const [searchName, setSearchName] = useState("");
  const [searchRollNo, setSearchRollNo] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
      setSearchResults(results);
      setFoundStudent(results.length === 1 ? results[0] : null);
      setSearched(true);
    } catch (err) {
      console.error('Failed to search students:', err);
      setFoundStudent(null);
      setSearchResults([]);
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
    setSearchResults([]);
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
      
      // Remove deleted student from search results list
      setSearchResults(prev => prev.filter(s => s._id !== foundStudent._id));

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
        <h1 className="title">Student Profile</h1>
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
              <Link to="/add-student" className="btn btn-primary">
                <FaUserPlus /> Add New Student
              </Link>
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
            <>
              {searchResults.length > 1 && (
                <button onClick={() => setFoundStudent(null)} className="btn btn-secondary" style={{ marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
                  <FaArrowLeft /> Back to Results
                </button>
              )}
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
                      <Link to={`/edit-student/${foundStudent._id}`} className="btn btn-secondary">
                        <FaEdit /> Edit
                      </Link>
                      <button onClick={handleDelete} className="btn btn-danger">
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
                        <span className="info-value">{new Date(foundStudent.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Gender</span>
                        <span className="info-value">{foundStudent.gender}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Blood Group</span>
                        <span className="info-value">{foundStudent.bloodGroup || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="profile-section">
                    <h3 className="section-title">
                      <FaPhone /> Contact Information
                    </h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Phone Number</span>
                        <span className="info-value">{foundStudent.phone || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{foundStudent.email || 'N/A'}</span>
                      </div>
                      <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                        <span className="info-label">Home Address</span>
                        <span className="info-value">{foundStudent.address || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Status */}
                  <div className="profile-section">
                    <h3 className="section-title">
                      <FaCalendarAlt /> Enrollment Details
                    </h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Admission Date</span>
                        <span className="info-value">{foundStudent.admissionDate ? new Date(foundStudent.admissionDate).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Attendance Rate</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                          <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${foundStudent.attendance || 0}%`, height: '100%', background: (foundStudent.attendance || 0) >= 75 ? '#10b981' : '#f59e0b', borderRadius: '4px' }}></div>
                          </div>
                          <span style={{ fontWeight: 'bold' }}>{foundStudent.attendance || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grades */}
                  <div className="profile-section">
                    <h3 className="section-title">
                      <FaBookOpen /> Academic Grades
                    </h3>
                    <div className="grades-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                      {Object.entries(getGrades(foundStudent)).length > 0 ? (
                        Object.entries(getGrades(foundStudent)).map(([subject, grade]) => (
                          <div key={subject} style={{ 
                            background: 'rgba(255, 255, 255, 0.02)', 
                            border: '1px solid var(--glass-border)', 
                            borderRadius: '10px', 
                            padding: '15px', 
                            textAlign: 'center' 
                          }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{subject}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold)' }}>{grade}</div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>No grades recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="profile-section">
                    <h3 className="section-title">
                      <FaTrophy /> Achievements
                    </h3>
                    <div className="achievements-list">
                      {foundStudent.achievements?.length > 0 ? (
                        foundStudent.achievements.map((ach, i) => (
                          <div className="achievement-item" key={i}>
                            <FaTrophy className="achievement-icon" />
                            <span>{ach}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No achievements recorded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : searchResults.length > 1 ? (
            <div className="profile-card-container" style={{ maxWidth: '850px', width: '100%', padding: '2.5rem' }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--gold)', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaSearch /> Search Results ({searchResults.length})
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Multiple students matched your query. Please select one to view their profile:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {searchResults.map(student => (
                  <div key={student._id} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '1.2rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                  >
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.15rem' }}>{student.name}</h3>
                      <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Class: <strong style={{ color: 'var(--text-primary)' }}>{student.class}-{student.section}</strong> | Roll No: <strong style={{ color: 'var(--text-primary)' }}>{student.rollNo}</strong>
                      </p>
                    </div>
                    <button onClick={() => setFoundStudent(student)} className="btn btn-primary">
                      View Profile
                    </button>
                  </div>
                ))}
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
