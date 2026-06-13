import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { submitAdmission } from '../api';

const ApplyNow = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      await submitAdmission(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message);
    }
  };

  return (
    <form className="apply" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 style={{ marginBottom: '20px' }}>Apply Now</h3>

      {submitted && (
        <div className="form-success-msg apply-success" style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaCheckCircle />
          <span>Application submitted successfully! We will contact you shortly.</span>
        </div>
      )}

      {submitError && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaExclamationCircle />
          <span>{submitError}</span>
        </div>
      )}

      {/* Firstname */}
      <div className={`input-box ${errors.firstname ? 'has-error' : ''}`}>
        <label htmlFor="firstname">Firstname *</label>
        <input
          id="firstname"
          type="text"
          aria-invalid={errors.firstname ? "true" : "false"}
          aria-describedby={errors.firstname ? "firstname-error" : undefined}
          {...register('firstname', {
            required: 'First name is required',
            minLength: { value: 2, message: 'Must be at least 2 characters' },
            maxLength: { value: 30, message: 'Must be at most 30 characters' },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Only letters and spaces allowed',
            },
          })}
        />
        {errors.firstname && <p id="firstname-error" className="field-error apply-error">{errors.firstname.message}</p>}
      </div>

      {/* Lastname */}
      <div className={`input-box ${errors.lastname ? 'has-error' : ''}`}>
        <label htmlFor="lastname">Lastname *</label>
        <input
          id="lastname"
          type="text"
          aria-invalid={errors.lastname ? "true" : "false"}
          aria-describedby={errors.lastname ? "lastname-error" : undefined}
          {...register('lastname', {
            required: 'Last name is required',
            minLength: { value: 2, message: 'Must be at least 2 characters' },
            maxLength: { value: 30, message: 'Must be at most 30 characters' },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Only letters and spaces allowed',
            },
          })}
        />
        {errors.lastname && <p id="lastname-error" className="field-error apply-error">{errors.lastname.message}</p>}
      </div>

      {/* Gender */}
      <div className={`input-box ${errors.gender ? 'has-error' : ''}`}>
        <label htmlFor="gender">Gender *</label>
        <select
          id="gender"
          aria-invalid={errors.gender ? "true" : "false"}
          aria-describedby={errors.gender ? "gender-error" : undefined}
          style={{
            width: '100%',
            border: 0,
            margin: '0 0 10px 0',
            fontSize: '15px',
            outline: 'none',
            borderBottom: '2px solid #cfcfcf',
            paddingBottom: '10px',
            fontFamily: 'Poppins, sans-serif',
            background: 'transparent',
          }}
          {...register('gender', {
            required: 'Please select your gender',
            validate: (value) => value !== 'select' || 'Please select your gender',
          })}
          defaultValue="select"
        >
          <option value="select" disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p id="gender-error" className="field-error apply-error">{errors.gender.message}</p>}
      </div>

      {/* Email */}
      <div className={`input-box ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && <p id="email-error" className="field-error apply-error">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div className={`input-box ${errors.phone ? 'has-error' : ''}`}>
        <label htmlFor="phone">Phone Number *</label>
        <input
          id="phone"
          type="text"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[\+]?[\d\s\-]{7,15}$/,
              message: 'Please enter a valid phone number',
            },
          })}
        />
        {errors.phone && <p id="phone-error" className="field-error apply-error">{errors.phone.message}</p>}
      </div>

      {/* Nationality */}
      <div className={`input-box ${errors.nationality ? 'has-error' : ''}`}>
        <label htmlFor="nationality">Nationality *</label>
        <input
          id="nationality"
          type="text"
          aria-invalid={errors.nationality ? "true" : "false"}
          aria-describedby={errors.nationality ? "nationality-error" : undefined}
          {...register('nationality', {
            required: 'Nationality is required',
            minLength: { value: 2, message: 'Must be at least 2 characters' },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Only letters allowed',
            },
          })}
        />
        {errors.nationality && <p id="nationality-error" className="field-error apply-error">{errors.nationality.message}</p>}
      </div>

      {/* State */}
      <div className={`input-box ${errors.state ? 'has-error' : ''}`}>
        <label htmlFor="state">State *</label>
        <input
          id="state"
          type="text"
          aria-invalid={errors.state ? "true" : "false"}
          aria-describedby={errors.state ? "state-error" : undefined}
          {...register('state', {
            required: 'State is required',
            minLength: { value: 2, message: 'Must be at least 2 characters' },
          })}
        />
        {errors.state && <p id="state-error" className="field-error apply-error">{errors.state.message}</p>}
      </div>

      {/* Address */}
      <div className={`input-box ${errors.address ? 'has-error' : ''}`}>
        <label htmlFor="address">Home Address *</label>
        <input
          id="address"
          type="text"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby={errors.address ? "address-error" : undefined}
          {...register('address', {
            required: 'Home address is required',
            minLength: { value: 5, message: 'Address must be at least 5 characters' },
          })}
        />
        {errors.address && <p id="address-error" className="field-error apply-error">{errors.address.message}</p>}
      </div>

      {/* How did you know about us */}
      <div className={`input-box ${errors.howKnow ? 'has-error' : ''}`}>
        <label htmlFor="how-know">How did you know about us *</label>
        <textarea
          id="how-know"
          aria-invalid={errors.howKnow ? "true" : "false"}
          aria-describedby={errors.howKnow ? "howKnow-error" : undefined}
          {...register('howKnow', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Please provide at least 5 characters' },
            maxLength: { value: 300, message: 'Must be at most 300 characters' },
          })}
        ></textarea>
        {errors.howKnow && <p id="howKnow-error" className="field-error apply-error">{errors.howKnow.message}</p>}
      </div>



      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary"
        style={{ marginTop: '20px' }}
      >
        {isSubmitting ? 'Submitting...' : 'Apply Now'}
      </button>
    </form>
  );
};

export default ApplyNow;
