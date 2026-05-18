import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { submitContact } from '../api';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register, 
    formState: { errors, isSubmitting }, 
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      await submitContact(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message);
    }
  };

  return (
    <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className='msg'>Send us a message</p>

        {submitted && (
          <div className="form-success-msg" style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCheckCircle />
            <span>Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        {submitError && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaExclamationCircle />
            <span>{submitError}</span>
          </div>
        )}

        <div className={`input-box ${errors.name ? 'has-error' : ''}`}>
          <input 
            placeholder='Full Name *'
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters"
              },
              maxLength: {
                value: 30,
                message: "Name must be at most 30 characters"
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters and spaces"
              }
            })}
            />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>

        <div className={`input-box ${errors.email ? 'has-error' : ''}`}>
          <input 
            placeholder='Email Address *'
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
              }
            })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div className={`input-box ${errors.subject ? 'has-error' : ''}`}>
          <input 
            placeholder='Subject *'
            {...register("subject", {
              required: "Subject is required",
              minLength: {
                value: 3,
                message: "Subject must be at least 3 characters"
              },
              maxLength: {
                value: 100,
                message: "Subject must be at most 100 characters"
              },
            })}
            />
            {errors.subject && <p className="field-error">{errors.subject.message}</p>}
        </div>

        <div className={`input-box ${errors.message ? 'has-error' : ''}`}>
          <textarea 
            placeholder='Your Message *'
            rows={30}
            cols={30}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters"
              },
              maxLength: {
                value: 500,
                message: "Message must be at most 500 characters"
              },
            })}
          ></textarea>
            {errors.message && <p className="field-error">{errors.message.message}</p>}
        </div>

        <button 
          id='btn'
          type='submit'
          disabled={isSubmitting}
        >{isSubmitting ? 'Sending...' : 'Send Message'}</button>
    </form>
  )
}

export default ContactForm
