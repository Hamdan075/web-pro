import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { SiteContext } from '../context/SiteContext';
import { getIcon } from '../utils/iconMap';
import { FaAngleRight, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const { navLinks, footerContact, footerContactNum } = useContext(SiteContext);

    const {
        register, 
        formState: {errors}, 
        handleSubmit
      } = useForm({
        mode: "all",
      });

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
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <FaEnvelope />
                <input 
                    type="email" 
                    placeholder='Enter your email address'
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
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', }}>
                    <FaArrowRight />
                </button>
            </form>
            <p style={{color: "red",}}>{errors.email?.message}</p>
        </div>
    </footer>
  )
}

export default Footer;