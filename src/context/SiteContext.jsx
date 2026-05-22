import React, { createContext } from 'react';
import { 
  navLinks, 
  missionVision, 
  whySchool, 
  testimonials, 
  footerContact, 
  footerContactNum, 
  AboutPart as aboutParts, 
  facilities, 
  MoreInfo as moreInfo 
} from '../constants';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const siteData = {
    navLinks,
    missionVision,
    whySchool,
    testimonials,
    footerContact,
    footerContactNum,
    aboutParts,
    facilities,
    moreInfo
  };

  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
};

