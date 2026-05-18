import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import { getIcon } from '../utils/iconMap';

const WhySchool = () => {
  const { whySchool: data } = useContext(SiteContext);

  return (
    <div className="content">
      <h1>Why Cambridge?</h1>
      <div className="reasons">
        {data.map(reason => (
          <div className="reason" key={reason._id}>
            <div className="icon">
              {getIcon(reason.icon)}
            </div>
            <h2>{reason.title}</h2>
            <p>{reason.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhySchool;