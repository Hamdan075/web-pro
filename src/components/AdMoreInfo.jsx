import React, { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import useScrollReveal from '../hooks/useScrollReveal';

const AdMoreInfo = () => {
  const { moreInfo: data } = useContext(SiteContext);

  const titleRef = useScrollReveal();
  const ref1 = useScrollReveal({ delay: '0.1s' });
  const ref2 = useScrollReveal({ delay: '0.2s' });
  const ref3 = useScrollReveal({ delay: '0.3s' });
  const ref4 = useScrollReveal({ delay: '0.4s' });
  const cardRefs = [ref1, ref2, ref3, ref4];

  return (
    <div className='ad-more'>
        <h2 ref={titleRef} className="scroll-hidden">More Information:</h2>
        <div className="ad-more-info">
            {data.map((info, i) => (
                <div className="more-info scroll-hidden" key={info._id} ref={cardRefs[i]}>
                    <p className='title'>{info.title}</p>
                    <p>{info.text}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdMoreInfo;
