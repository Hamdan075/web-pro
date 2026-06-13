import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchStudent, updateStudent } from '../api';
import Footer from '../components/Footer';
import StudentForm from '../components/StudentForm';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null, success: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onBlur"
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }

    const loadStudentData = async () => {
      try {
        const student = await fetchStudent(id);
        
        // Format dates to YYYY-MM-DD for date inputs
        const formatDate = (dateStr) => {
          if (!dateStr) return '';
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return dateStr;
          return date.toISOString().split('T')[0];
        };

        reset({
          name: student.name,
          fatherName: student.fatherName,
          rollNo: student.rollNo,
          class: student.class,
          section: student.section,
          dateOfBirth: formatDate(student.dateOfBirth),
          gender: student.gender,
          phone: student.phone || '',
          email: student.email || '',
          bloodGroup: student.bloodGroup || '',
          admissionDate: formatDate(student.admissionDate),
          address: student.address || '',
          attendance: student.attendance || 0,
          achievements: student.achievements ? student.achievements.join(', ') : '',
          gradeEnglish: student.grades?.English || '',
          gradeMaths: student.grades?.Mathematics || '',
          gradeScience: student.grades?.Science || '',
          gradeUrdu: student.grades?.Urdu || '',
          gradeIslamiat: student.grades?.Islamiat || '',
          gradeComputer: student.grades?.['Computer Science'] || '',
        });
        setLoadingStudent(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setSubmitStatus(prev => ({ ...prev, error: 'Failed to load student data. Please check if student exists.' }));
        setLoadingStudent(false);
      }
    };

    loadStudentData();
  }, [id, isAdmin, navigate, reset]);

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
      await updateStudent(id, formattedData);
      setSubmitStatus({ loading: false, error: null, success: true });
      
      // Auto redirect back to profile page after success
      setTimeout(() => {
        navigate('/student-profile');
      }, 3000);
    } catch (error) {
      setSubmitStatus({ loading: false, error: error.message, success: false });
    }
  };

  if (!isAdmin) {
    return null; // Navigation is handled in useEffect
  }

  return (
    <>
      <div className="pages student-hero">
        <FaUserEdit className="student-hero-icon" />
        <h1 className="title">Edit Student Profile</h1>
        <p className="student-hero-sub">Update student details in the database</p>
      </div>

      <section className="student-search-section">
        <div className="student-search-card" style={{ maxWidth: '800px' }}>
          
          <div className="search-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/student-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>
              <FaArrowLeft /> Back to Search
            </Link>
            <h2>Update Student Details</h2>
            <div style={{ width: '100px' }}></div> {/* Spacer for balance */}
          </div>

          {loadingStudent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', gap: '1rem' }}>
              <span className="search-spinner" style={{ borderTopColor: 'var(--brand)', width: '30px', height: '30px' }}></span>
              <p style={{ color: '#666', fontWeight: 500 }}>Loading student details...</p>
            </div>
          ) : (
            <>
              {submitStatus.success && (
                <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle /> Student successfully updated! Redirecting to search...
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
                buttonText="Update Student"
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EditStudent;
