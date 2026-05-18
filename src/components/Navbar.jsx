import { FaBars } from "react-icons/fa";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { navLinks } = useContext(SiteContext);

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
  </div>
  
  <div className="menu-icons">
    <FaBars onClick={() => setToggle(prev => !prev)} />
  </div>
  
  <div className={`${toggle ? 'show' : 'hidden'}`}>
    {navLinks.map(nav => (
      <NavLink to={nav.link} key={nav._id}>{nav.id}</NavLink>
    ))}
  </div>
</nav>

    );
}
 
export default Navbar;