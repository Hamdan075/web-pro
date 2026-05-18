import React from 'react';
import { FaLocationArrow, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactAddress = () => {
  return (
    <div className="address">
        <div className="add">
          <div className="icon">
            <FaMapMarkerAlt />
          </div>
          <p>Liquat Road, Mian Channu <br />Punjab, Pakistan</p>
        </div>
        <div className="add">
          <div className="icon">
            <FaPhone />
          </div>
          <p>+92 333 6248969 <br />+92 333 2830016</p>
        </div>
        <div className="add">
          <div className="icon">
            <FaLocationArrow />
          </div>
          <p>info@cambridgeschool.edu.pk</p>
        </div>
    </div>
  )
}

export default ContactAddress
