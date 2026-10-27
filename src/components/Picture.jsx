export function Picture({ picture, lqip, alt, sizes, priority = false, eager = false, className, imgClass }) {
  const sources = picture?.sources || {};
  return (
    <picture className={className}>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        className={imgClass}
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        sizes={sizes}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        style={lqip ? { backgroundImage: `url("${lqip}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      />
    </picture>
  );
}
