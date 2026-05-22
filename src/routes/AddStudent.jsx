import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addStudent } from '../api';
import Footer from '../components/Footer';
import { FaUserPlus, FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaChartLine, FaBookOpen } from 'react-icons/fa';

const AddStudent = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null, success: false });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    setSubmitStatus({ loading: true, error: null, success: false });
    
    // Structure the grades map
    const grades = {};
    if (data.gradeEnglish) grades.English = data.gradeEnglish;
    if (data.gradeMaths) grades.Mathematics = data.gradeMaths;
    if (data.gradeScience) grades.Science = data.gradeScience;
    if (data.gradeUrdu) grades.Urdu = data.gradeUrdu;
    if (data.gradeIslamiat) grades.Islamiat = data.gradeIslamiat;
    if (data.gradeComputer) grades['Computer Science'] = data.gradeComputer;

    // Convert numeric fields and reconstruct achievements array
    const formattedData = {
      ...data,
      rollNo: parseInt(data.rollNo, 10),
      class: parseInt(data.class, 10),
      attendance: data.attendance ? parseInt(data.attendance, 10) : 0,
      achievements: data.achievements ? data.achievements.split(',').map(item => item.trim()).filter(Boolean) : [],
      grades: grades
    };

    // Clean up temporary form grade fields
    delete formattedData.gradeEnglish;
    delete formattedData.gradeMaths;
    delete formattedData.gradeScience;
    delete formattedData.gradeUrdu;
    delete formattedData.gradeIslamiat;
    delete formattedData.gradeComputer;

    try {
      await addStudent(formattedData);
      setSubmitStatus({ loading: false, error: null, success: true });
      reset();
      
      // Optional: Auto redirect after success
      setTimeout(() => {
        navigate('/student-profile');
      }, 3000);
    } catch (error) {
      setSubmitStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <>
      <div className="pages student-hero">
        <FaUserPlus className="student-hero-icon" />
        <p className="title">Add New Student</p>
        <p className="student-hero-sub">Register a new student into the database</p>
      </div>

      <section className="student-search-section">
        <div className="student-search-card" style={{ maxWidth: '800px' }}>
          
          <div className="search-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/student-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>
              <FaArrowLeft /> Back to Search
            </Link>
            <h2>Student Details</h2>
            <div style={{ width: '100px' }}></div> {/* Spacer for balance */}
          </div>

          {submitStatus.success && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaCheckCircle /> Student successfully added! Redirecting...
            </div>
          )}

          {submitStatus.error && (
            <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaExclamationCircle /> {submitStatus.error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="student-search-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            <div className="search-field">
              <label>Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                {...register("name", { required: "Name is required" })}
                style={{ borderColor: errors.name ? 'red' : '' }}
              />
              {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name.message}</span>}
            </div>

            <div className="search-field">
              <label>Father's Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Richard Doe"
                {...register("fatherName", { required: "Father's name is required" })}
                style={{ borderColor: errors.fatherName ? 'red' : '' }}
              />
              {errors.fatherName && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.fatherName.message}</span>}
            </div>

            <div className="search-field">
              <label>Roll Number *</label>
              <input 
                type="number" 
                placeholder="e.g. 101"
                {...register("rollNo", { required: "Roll number is required" })}
                style={{ borderColor: errors.rollNo ? 'red' : '' }}
              />
              {errors.rollNo && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.rollNo.message}</span>}
            </div>

            <div className="search-field" style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Class *</label>
                <input 
                  type="number" 
                  placeholder="e.g. 10"
                  {...register("class", { required: "Class is required" })}
                  style={{ borderColor: errors.class ? 'red' : '' }}
                />
                {errors.class && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.class.message}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Section *</label>
                <input 
                  type="text" 
                  placeholder="e.g. A"
                  {...register("section", { required: "Section is required" })}
                  style={{ borderColor: errors.section ? 'red' : '' }}
                />
                {errors.section && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.section.message}</span>}
              </div>
            </div>

            <div className="search-field">
              <label>Date of Birth *</label>
              <input 
                type="date"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
                style={{ borderColor: errors.dateOfBirth ? 'red' : '' }}
              />
              {errors.dateOfBirth && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.dateOfBirth.message}</span>}
            </div>

            <div className="search-field">
              <label>Gender *</label>
              <select 
                {...register("gender", { required: "Gender is required" })}
                style={{ padding: '12px 16px', borderRadius: '10px', border: errors.gender ? '2px solid red' : '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.gender.message}</span>}
            </div>

            <div className="search-field">
              <label>Phone Number</label>
              <input 
                type="text" 
                placeholder="e.g. +92 300 1234567"
                {...register("phone")}
              />
            </div>

            <div className="search-field">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. student@example.com"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</span>}
            </div>

            <div className="search-field">
              <label>Blood Group</label>
              <input 
                type="text" 
                placeholder="e.g. O+"
                {...register("bloodGroup")}
              />
            </div>

            <div className="search-field">
              <label>Admission Date</label>
              <input 
                type="date"
                {...register("admissionDate")}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid #e1e5ea', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                <FaChartLine /> Performance & Achievements
              </h3>
            </div>

            <div className="search-field">
              <label>Attendance (%)</label>
              <input 
                type="number" 
                placeholder="e.g. 95"
                {...register("attendance", { 
                  min: { value: 0, message: "Attendance cannot be less than 0" },
                  max: { value: 100, message: "Attendance cannot exceed 100" }
                })}
                style={{ borderColor: errors.attendance ? 'red' : '' }}
              />
              {errors.attendance && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.attendance.message}</span>}
            </div>

            <div className="search-field">
              <label>Achievements (comma-separated)</label>
              <input 
                type="text" 
                placeholder="e.g. Sports Captain, Math Olympiad Winner"
                {...register("achievements")}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid #e1e5ea', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                <FaBookOpen /> Academic Grades
              </h3>
            </div>

            <div className="search-field">
              <label>English Grade</label>
              <select 
                {...register("gradeEnglish")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field">
              <label>Mathematics Grade</label>
              <select 
                {...register("gradeMaths")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field">
              <label>Science Grade</label>
              <select 
                {...register("gradeScience")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field">
              <label>Urdu Grade</label>
              <select 
                {...register("gradeUrdu")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field">
              <label>Islamiat Grade</label>
              <select 
                {...register("gradeIslamiat")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field">
              <label>Computer Science Grade</label>
              <select 
                {...register("gradeComputer")}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e1e5ea', width: '100%', fontSize: '15px', fontFamily: 'Poppins, sans-serif', background: '#f8f9fb' }}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="search-field" style={{ gridColumn: '1 / -1' }}>
              <label>Home Address</label>
              <textarea 
                placeholder="Enter complete address"
                rows="3"
                {...register("address")}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%', fontSize: '1rem', resize: 'vertical' }}
              ></textarea>
            </div>

            <div className="search-actions" style={{ gridColumn: '1 / -1', marginTop: '1rem', justifyContent: 'center' }}>
              <button type="submit" className="search-btn" disabled={submitStatus.loading} style={{ width: '100%', maxWidth: '300px' }}>
                {submitStatus.loading ? (
                  <span className="search-spinner"></span>
                ) : (
                  <FaUserPlus />
                )}
                {submitStatus.loading ? "Saving Student..." : "Add Student"}
              </button>
            </div>

          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddStudent;
