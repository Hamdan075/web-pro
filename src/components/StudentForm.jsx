import React from 'react';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaBookOpen, 
  FaChartLine 
} from "react-icons/fa";

const StudentForm = ({ register, errors, onSubmit, handleSubmit, loading, buttonText }) => {
  const isUpdate = buttonText.toLowerCase().includes('update');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="student-search-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      
      <div className="search-field">
        <label htmlFor="student-name">Full Name *</label>
        <input 
          type="text" 
          id="student-name"
          placeholder="e.g. John Doe"
          {...register("name", { required: "Name is required" })}
          style={{ borderColor: errors.name ? 'red' : '' }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name.message}</span>}
      </div>

      <div className="search-field">
        <label htmlFor="student-fatherName">Father's Name *</label>
        <input 
          type="text" 
          id="student-fatherName"
          placeholder="e.g. Richard Doe"
          {...register("fatherName", { required: "Father's name is required" })}
          style={{ borderColor: errors.fatherName ? 'red' : '' }}
        />
        {errors.fatherName && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.fatherName.message}</span>}
      </div>

      <div className="search-field">
        <label htmlFor="student-rollNo">Roll Number *</label>
        <input 
          type="number" 
          id="student-rollNo"
          placeholder="e.g. 101"
          {...register("rollNo", { required: "Roll number is required" })}
          style={{ borderColor: errors.rollNo ? 'red' : '' }}
        />
        {errors.rollNo && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.rollNo.message}</span>}
      </div>

      <div className="search-field" style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="student-class">Class *</label>
          <input 
            type="number" 
            id="student-class"
            placeholder="e.g. 10"
            {...register("class", { required: "Class is required" })}
            style={{ borderColor: errors.class ? 'red' : '' }}
          />
          {errors.class && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.class.message}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="student-section">Section *</label>
          <input 
            type="text" 
            id="student-section"
            placeholder="e.g. A"
            {...register("section", { required: "Section is required" })}
            style={{ borderColor: errors.section ? 'red' : '' }}
          />
          {errors.section && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.section.message}</span>}
        </div>
      </div>

      <div className="search-field">
        <label htmlFor="student-dateOfBirth">Date of Birth *</label>
        <input 
          type="date"
          id="student-dateOfBirth"
          {...register("dateOfBirth", { required: "Date of birth is required" })}
          style={{ borderColor: errors.dateOfBirth ? 'red' : '' }}
        />
        {errors.dateOfBirth && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.dateOfBirth.message}</span>}
      </div>

      <div className="search-field">
        <label htmlFor="student-gender">Gender *</label>
        <select 
          id="student-gender"
          {...register("gender", { required: "Gender is required" })}
          style={{ padding: '12px 16px', borderRadius: '10px', border: errors.gender ? '2px solid red' : '', width: '100%', fontSize: '15px' }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.gender.message}</span>}
      </div>

      <div className="search-field">
        <label htmlFor="student-phone">Phone Number</label>
        <input 
          type="text" 
          id="student-phone"
          placeholder="e.g. +92 300 1234567"
          {...register("phone")}
        />
      </div>

      <div className="search-field">
        <label htmlFor="student-email">Email Address</label>
        <input 
          type="email" 
          id="student-email"
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
        <label htmlFor="student-bloodGroup">Blood Group</label>
        <input 
          type="text" 
          id="student-bloodGroup"
          placeholder="e.g. O+"
          {...register("bloodGroup")}
        />
      </div>

      <div className="search-field">
        <label htmlFor="student-admissionDate">Admission Date</label>
        <input 
          type="date"
          id="student-admissionDate"
          {...register("admissionDate")}
        />
      </div>

      <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid #e1e5ea', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
          <FaChartLine /> Performance & Achievements
        </h3>
      </div>

      <div className="search-field">
        <label htmlFor="student-attendance">Attendance (%)</label>
        <input 
          type="number" 
          id="student-attendance"
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
        <label htmlFor="student-achievements">Achievements (comma-separated)</label>
        <input 
          type="text" 
          id="student-achievements"
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
        <label htmlFor="grade-english">English Grade</label>
        <select 
          id="grade-english"
          {...register("gradeEnglish")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="grade-maths">Mathematics Grade</label>
        <select 
          id="grade-maths"
          {...register("gradeMaths")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="grade-science">Science Grade</label>
        <select 
          id="grade-science"
          {...register("gradeScience")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="grade-urdu">Urdu Grade</label>
        <select 
          id="grade-urdu"
          {...register("gradeUrdu")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="grade-islamiat">Islamiat Grade</label>
        <select 
          id="grade-islamiat"
          {...register("gradeIslamiat")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="grade-computer">Computer Science Grade</label>
        <select 
          id="grade-computer"
          {...register("gradeComputer")}
          style={{ padding: '12px 16px', borderRadius: '10px', width: '100%', fontSize: '15px' }}
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
        <label htmlFor="student-address">Home Address</label>
        <textarea 
          placeholder="Enter complete address"
          id="student-address"
          rows="3"
          {...register("address")}
        ></textarea>
      </div>

      <div className="search-actions" style={{ gridColumn: '1 / -1', marginTop: '1rem', justifyContent: 'center' }}>
        <button type="submit" className="search-btn" disabled={loading} style={{ width: '100%', maxWidth: '300px' }}>
          {loading ? (
            <span className="search-spinner"></span>
          ) : isUpdate ? (
            <FaUserEdit />
          ) : (
            <FaUserPlus />
          )}
          {loading ? (isUpdate ? "Updating Student..." : "Saving Student...") : buttonText}
        </button>
      </div>

    </form>
  );
};

export default StudentForm;
