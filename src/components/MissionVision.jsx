import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import { getIcon } from '../utils/iconMap';
import useScrollReveal from '../hooks/useScrollReveal';

const MissionVision = () => {
  const { missionVision: data } = useContext(SiteContext);
  const titleRef = useScrollReveal();
  const card1Ref = useScrollReveal({ delay: '0.15s' });
  const card2Ref = useScrollReveal({ delay: '0.3s' });

  const cardRefs = [card1Ref, card2Ref];

  return (
    <div className='content'>
      <h1 ref={titleRef} className="scroll-hidden">Our Mission and Vision</h1>
      <div className="mission-vision">
        {data.map((missVis, i) => (
          <div className="missVis scroll-hidden" key={missVis._id} ref={cardRefs[i]}>
            <div className="icons">
              {getIcon(missVis.icon)}
            </div>
            <h2>{missVis.title}</h2>
            <p>{missVis.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MissionVision;