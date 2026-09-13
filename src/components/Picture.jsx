/**
 * Renders the output of a vite-imagetools `?as=picture` import as a
 * responsive <picture> with AVIF/WebP sources and a sized fallback <img>.
 */
export default function Picture({ picture, alt, sizes = '100vw', priority = false, className, imgClassName, style }) {
  const { sources, img } = picture;
  return (
    <picture className={className} style={style}>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} srcSet={srcSet} type={`image/${format}`} sizes={sizes} />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  );
}
