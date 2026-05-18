import React, { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import useScrollReveal from '../hooks/useScrollReveal';

const AboutParts = () => {
  const { aboutParts: data } = useContext(SiteContext);

  const ref1 = useScrollReveal({ delay: '0s' });
  const ref2 = useScrollReveal({ delay: '0.15s' });
  const ref3 = useScrollReveal({ delay: '0.3s' });
  const cardRefs = [ref1, ref2, ref3];

  return (
    <div className='parts'>
      {data.map((part, i) => (
        <div className="part scroll-hidden" key={part._id} ref={cardRefs[i]}>
            <div className="image">
              <img src={part.image} alt={part.title}  />
            </div>
            <h3>{part.title}</h3>
            <p>{part.text}</p>
        </div>
      ))}
    </div>
  )
}

export default AboutParts;