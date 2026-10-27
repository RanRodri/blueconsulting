import { useEffect, useRef, useState } from 'react';

export function Picture({ picture, lqip, alt, sizes, priority = false, className, imgClass }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(priority);
  useEffect(() => {
    if (priority) return undefined;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setReady(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);
  const sources = picture?.sources || {};
  return (
    <picture className={className} ref={ref}>
      {ready && Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        className={imgClass}
        src={ready ? picture.img.src : lqip}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        style={lqip ? { backgroundImage: `url("${lqip}")`, backgroundSize: 'cover' } : undefined}
      />
    </picture>
  );
}
