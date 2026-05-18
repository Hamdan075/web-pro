import { FaBars } from "react-icons/fa";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { navLinks } = useContext(SiteContext);
    const { isAdmin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    return ( 
        <nav className="navbar">
  <div className="brand">
    <img src={logo} alt="logo" className="logo" />
    <span className="school-name">Cambridge School</span>
  </div>
  
  <div className="nav-links">
    {navLinks.map(nav => (
      <NavLink to={nav.link} key={nav._id} className="link">{nav.id}</NavLink>
    ))}
    {isAdmin ? (
      <button onClick={handleLogout} className="link" style={{ background: 'transparent', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}>Logout</button>
    ) : (
      <NavLink to="/admin-login" className="link">Admin</NavLink>
    )}
  </div>
  
  <div className="menu-icons">
    <FaBars onClick={() => setToggle(prev => !prev)} />
  </div>
  
  <div className={`${toggle ? 'show' : 'hidden'}`}>
    {navLinks.map(nav => (
      <NavLink to={nav.link} key={nav._id}>{nav.id}</NavLink>
    ))}
    {isAdmin ? (
      <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0, display: 'block', margin: '1rem 0' }}>Logout</button>
    ) : (
      <NavLink to="/admin-login">Admin</NavLink>
    )}
  </div>
</nav>

    );
}
 
export default Navbar;