import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addStudent } from '../api';
import Footer from '../components/Footer';
import StudentForm from '../components/StudentForm';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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
        <h1 className="title">Add New Student</h1>
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

          <StudentForm 
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            loading={submitStatus.loading}
            buttonText="Add Student"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddStudent;
