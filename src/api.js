const API_BASE = 'http://localhost:5000/api';

async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}

export const fetchNavLinks = () => fetchData('/navlinks');
export const fetchMissionVision = () => fetchData('/mission-vision');
export const fetchWhySchool = () => fetchData('/why-school');
export const fetchTestimonials = () => fetchData('/testimonials');
export const fetchFooterContact = () => fetchData('/footer-contact');
export const fetchFooterContactNum = () => fetchData('/footer-contact-num');
export const fetchAboutParts = () => fetchData('/about-parts');
export const fetchFacilities = () => fetchData('/facilities');
export const fetchMoreInfo = () => fetchData('/more-info');
export const fetchPrograms = () => fetchData('/programs');

export const searchStudents = (params) => {
  const query = new URLSearchParams();
  if (params.name) query.set('name', params.name);
  if (params.rollNo) query.set('rollNo', params.rollNo);
  if (params.class) query.set('class', params.class);
  return fetchData(`/students?${query.toString()}`);
};

export const addStudent = async (studentData) => {
  const response = await fetch(`${API_BASE}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }
  return response.json();
};

export const submitContact = async (contactData) => {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }
  return response.json();
};

export const submitAdmission = async (admissionData) => {
  const response = await fetch(`${API_BASE}/admission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admissionData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }
  return response.json();
};
