import { useEffect, useState } from 'react';

/** Id of the section currently occupying the middle band of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    const clearAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener('scroll', clearAtTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', clearAtTop);
    };
  }, [ids]);

  return active;
}
