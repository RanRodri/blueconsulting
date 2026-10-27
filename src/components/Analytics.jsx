import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    const plausibleSrc = import.meta.env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';
    const umamiSrc = import.meta.env.VITE_UMAMI_SRC;
    const umamiId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const script = document.createElement('script');
    script.defer = true;
    if (domain) {
      script.src = plausibleSrc;
      script.dataset.domain = domain;
    } else if (umamiSrc && umamiId) {
      script.src = umamiSrc;
      script.dataset.websiteId = umamiId;
    } else {
      return undefined;
    }
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}
