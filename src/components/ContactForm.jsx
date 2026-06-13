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
            id="name"
            placeholder='Full Name *'
            aria-label='Full Name'
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
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
            {errors.name && <p id="name-error" className="field-error">{errors.name.message}</p>}
        </div>

        <div className={`input-box ${errors.email ? 'has-error' : ''}`}>
          <input 
            id="email"
            placeholder='Email Address *'
            type="email"
            aria-label='Email Address'
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
              }
            })}
            />
            {errors.email && <p id="email-error" className="field-error">{errors.email.message}</p>}
        </div>

        <div className={`input-box ${errors.subject ? 'has-error' : ''}`}>
          <input 
            id="subject"
            placeholder='Subject *'
            aria-label='Subject'
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
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
            {errors.subject && <p id="subject-error" className="field-error">{errors.subject.message}</p>}
        </div>

        <div className={`input-box ${errors.message ? 'has-error' : ''}`}>
          <textarea 
            id="message"
            placeholder='Your Message *'
            aria-label='Your Message'
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
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
            {errors.message && <p id="message-error" className="field-error">{errors.message.message}</p>}
        </div>

        <button 
          className='btn btn-primary'
          type='submit'
          disabled={isSubmitting}
        >{isSubmitting ? 'Sending...' : 'Send Message'}</button>
    </form>
  )
}

export default ContactForm
