import React, { useState, useEffect, useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import { getIcon } from '../utils/iconMap';

const Testimonials = () => {
  const { testimonials: people } = useContext(SiteContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!people || people.length === 0) return;
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    if (!people || people.length === 0) return;
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => (
      clearInterval(slider)
    );
  }, [index, people]);

  return (
    <div className="content">
      <h1>What our Students say</h1>
      <div className="testimonials">
        {people.map((test, indexTest) => {
          const { _id, icon, image, name, testimonial } = test;
          let position = "nextSlide";
          if (indexTest === index) {
            position = "activeSlide";
          }
          if (indexTest === index - 1 || (index === 0 && indexTest === people.length - 1)) {
            position = "lastslide";
          }
          return (
            <article className={position} key={_id}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <p>{testimonial}</p>
              <div className="icon">
                {getIcon(icon)}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Testimonials;