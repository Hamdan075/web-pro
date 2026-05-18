import { useEffect, useRef } from 'react';

const useScrollReveal = ({ animation = 'reveal-up', threshold = 0.15, delay = '0s' } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transitionDelay = delay;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(animation);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animation, threshold, delay]);

  return ref;
};

export default useScrollReveal;
