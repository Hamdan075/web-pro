import {
  FaAngleDoubleDown,
  FaCertificate,
  FaChalkboardTeacher,
  FaEnvelope,
  FaPhone,
  FaQuoteRight,
  FaSchool,
} from 'react-icons/fa';

// Maps icon name strings (from MongoDB) to actual React icon components
const iconMap = {
  FaAngleDoubleDown: <FaAngleDoubleDown />,
  FaCertificate: <FaCertificate />,
  FaChalkboardTeacher: <FaChalkboardTeacher />,
  FaEnvelope: <FaEnvelope />,
  FaPhone: <FaPhone />,
  FaQuoteRight: <FaQuoteRight />,
  FaSchool: <FaSchool />,
};

export const getIcon = (iconName) => {
  return iconMap[iconName] || null;
};

export default iconMap;
