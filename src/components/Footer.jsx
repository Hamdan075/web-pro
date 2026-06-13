import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiteContext } from '../context/SiteContext';
import { getIcon } from '../utils/iconMap';
import { FaAngleRight, FaArrowRight, FaEnvelope, FaCheckCircle, FaSpinner, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { subscribeNewsletter } from '../api';

const Footer = () => {
    const { navLinks, footerContact, footerContactNum } = useContext(SiteContext);
    const [subState, setSubState] = useState({ loading: false, success: false, error: null });

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        reset
      } = useForm({
        mode: "all",
      });

    const onSubmit = async (data) => {
        setSubState({ loading: true, success: false, error: null });
        try {
            await subscribeNewsletter(data.email);
            setSubState({ loading: false, success: true, error: null });
            reset();
            setTimeout(() => setSubState(prev => ({ ...prev, success: false })), 4000);
        } catch (err) {
            setSubState({ loading: false, success: false, error: err.message });
        }
    };

  return (
    <footer>
        <div className="col first-col">
            <h2>Cambridge School</h2>
            <p>Dedicated to nurturing minds and shaping futures, Cambridge School provides quality education, a safe environment, and opportunities for every student to grow academically, socially, and personally.</p>
        </div>
        <div className="col second-col">
            <h2>Links</h2>
            {navLinks.map(link => (
                <ul key={link._id}>
                    <li>
                        <NavLink to={`/${link.link}`}>
                            <FaAngleRight /> {link.id}
                        </NavLink>
                    </li>
                </ul>    
            ))}
        </div>
        <div className="col third-col">
            <h2>Contact us</h2>
            {footerContact.map(contact => (
                <ul key={contact._id}>
                    <li>{contact.text}</li>
                </ul>
            ))}
            <div className="contNum">
                {footerContactNum.map(msg => (
                    <ul key={msg._id}>
                        <li><div className="icon">{getIcon(msg.icon)}</div>{msg.text}</li>
                    </ul>
                ))}
            </div>
        </div>
        <div className="col fourth-col">
            <h2>Get Informed</h2>
            <p>Subscribe to our newsletter</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FaEnvelope />
                <input 
                    type="email" 
                    placeholder='Enter your email address'
                    disabled={subState.loading}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email must be valid"
                        }
                      })}
                />
                <button 
                    type='submit' 
                    disabled={subState.loading}
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {subState.loading ? <FaSpinner className="spin" /> : <FaArrowRight />}
                </button>
            </form>
            {errors.email && <p style={{color: "red", marginTop: "5px", fontSize: "0.85rem"}}>{errors.email.message}</p>}
            {subState.success && <p style={{color: "var(--gold)", marginTop: "5px", fontSize: "0.85rem", display: 'flex', alignItems: 'center', gap: '4px'}}><FaCheckCircle /> Subscribed successfully!</p>}
            {subState.error && <p style={{color: "red", marginTop: "5px", fontSize: "0.85rem"}}>{subState.error}</p>}
        </div>
    </footer>
  )
}

export default Footer;