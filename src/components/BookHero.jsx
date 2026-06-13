import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookOpen, FaAward, FaGraduationCap, FaAngleDoubleDown } from 'react-icons/fa';
import logo from '../assets/logo.png';

const BookHero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;
      
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Animation values based on progress
  // Phase 1: Open Cover (progress 0 to 0.45)
  const coverRotateY = Math.max(-145, -(scrollProgress / 0.45) * 145);
  const leftPageRotateY = Math.max(-130, -(Math.min(1, scrollProgress / 0.45)) * 130);
  const rightPageRotateY = Math.max(-10, -(Math.min(1, scrollProgress / 0.45)) * 10);

  // Phase 2: Zoom & Fly-through (progress 0.45 to 0.8)
  const zoomProgress = scrollProgress < 0.45 ? 0 : Math.min(1, (scrollProgress - 0.45) / 0.35);
  const bookScale = 1 + zoomProgress * 4.5;
  const bookTranslateZ = zoomProgress * 800;
  const bookOpacity = scrollProgress < 0.45 ? 1 : Math.max(0, 1 - (scrollProgress - 0.45) / 0.25);

  // Home Hero text reveal (progress 0.4 to 0.8)
  const textProgress = scrollProgress < 0.4 ? 0 : Math.min(1, (scrollProgress - 0.4) / 0.35);
  const textOpacity = textProgress;
  const textScale = 0.85 + textProgress * 0.15;
  const textTranslateY = 30 * (1 - textProgress);

  // Helper text opacity
  const hintOpacity = Math.max(0, 1 - scrollProgress * 5);

  return (
    <div className="book-hero-section" ref={containerRef}>
      {/* 3D Book Interactive Wrapper */}
      <div className="book-sticky-wrapper">
        <div 
          className="book-container"
          style={{
            transform: `rotateX(${15 - Math.min(1, scrollProgress / 0.4) * 15}deg) rotateY(${-12 + Math.min(1, scrollProgress / 0.4) * 12}deg) scale(${bookScale}) translateZ(${bookTranslateZ}px)`,
            opacity: bookOpacity,
            pointerEvents: scrollProgress >= 0.7 ? 'none' : 'auto'
          }}
        >
          {/* Spine */}
          <div className="book-spine" />

          {/* Back Cover */}
          <div className="book-cover back" />

          {/* Right Page (Page 2) */}
          <div 
            className="book-page right-page"
            style={{ transform: `rotateY(${rightPageRotateY}deg)` }}
          >
            <FaGraduationCap className="page-crest" />
            <h3 className="page-title">EXCELLENCE</h3>
            <p className="page-text">
              "Cultivating an environment that fosters academic excellence, nurtures creativity, and embraces diversity."
            </p>
            <div className="page-footer">ESTD 1995</div>
          </div>

          {/* Left Page (Page 1) */}
          <div 
            className="book-page left-page"
            style={{ 
              transform: `rotateY(${leftPageRotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              style={{
                transform: 'rotateY(180deg) translateZ(1px)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                backfaceVisibility: 'hidden'
              }}
            >
              <FaAward className="page-crest" />
              <h3 className="page-title">WELCOME</h3>
              <p className="page-text">
                To Cambridge School, a virtual home where knowledge thrives, dreams soar, and friendships flourish.
              </p>
              <div className="page-footer">PAGE I</div>
            </div>
          </div>

          {/* Front Cover */}
          <div 
            className="book-cover front"
            style={{ transform: `rotateY(${coverRotateY}deg)` }}
          >
            <img src={logo} alt="crest" style={{ width: '90px', marginBottom: '20px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))' }} />
            <h2 className="cover-title">CAMBRIDGE</h2>
            <p className="cover-subtitle">SCHOOL PORTAL</p>
            <div className="cover-badge">ENTER REALM</div>
          </div>
        </div>

        {/* Revealed Home Page Hero Content */}
        <div 
          className="hero-reveal-container"
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale}) translateY(${textTranslateY}px)`,
            pointerEvents: scrollProgress >= 0.65 ? 'auto' : 'none'
          }}
        >
          <div className="home">
            <div className="home-bg-overlay" />
            <h1 className="title">Welcome to Cambridge School</h1>
            <p className="info">
              We are delighted to have you visit our virtual home - a place where knowledge thrives, dreams soar, and friendships flourish. At Cambridge school, we believe in cultivating an environment that fosters academic excellence, nurtures creativity, and embraces diversity.
            </p>
            <NavLink to="/about" className="explore-btn">
              Explore Our Campus
            </NavLink>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="scroll-hint" style={{ opacity: hintOpacity }}>
          <span>Scroll to Open</span>
          <div className="scroll-hint-mouse">
            <div className="scroll-hint-wheel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHero;
