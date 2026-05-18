import React, { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import useScrollReveal from '../hooks/useScrollReveal';

const FacilityList = () => {
  const { facilities: data } = useContext(SiteContext);

  const refs = [
    useScrollReveal({ animation: 'reveal-scale', delay: '0s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.1s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.2s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.1s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.2s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.1s' }),
    useScrollReveal({ animation: 'reveal-scale', delay: '0.2s' }),
  ];

  return (
    <div className='facilities'>
        {data.map((fac, i) => (
            <div className='facility scroll-hidden-scale' key={fac._id} ref={refs[i]}>
                <h3>{fac.title}</h3>
                <img src={fac.image} alt={fac.title} />
                <p>{fac.text}</p>
            </div>
        ))}
    </div>
  )
}

export default FacilityList;
