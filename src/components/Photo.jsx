const SIZE = {
  env: [1000, 750],
  mine: [1200, 900],
  admin: [1200, 900],
  nature: [1200, 675],
};

export function Photo({ name, alt, priority = false, className }) {
  const [w, h] = SIZE[name];
  return (
    <picture className={className}>
      <source srcSet={`/photos/${name}.avif`} type="image/avif" />
      <img
        src={`/photos/${name}.webp`}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
      />
    </picture>
  );
}
