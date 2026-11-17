import React, { useEffect, useRef, useState } from 'react';

interface ArtworkImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  priority?: 'high' | 'default';
  aspectRatio?: string;
  fit?: 'contain' | 'cover';
  className?: string;
  width?: number;
  height?: number;
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  src,
  fallbackSrc = '/images/archival-fallback.svg',
  alt,
  priority = 'default',
  aspectRatio,
  fit = 'contain',
  className = '',
  width,
  height,
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setUsingFallback(false);

    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0 && el.getAttribute('src') === src) {
      setStatus('loaded');
    } else {
      setStatus('loading');
    }
  }, [src]);

  const handleLoad = () => {
    setStatus('loaded');
  };

  const handleError = () => {
    if (!usingFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      setUsingFallback(true);
      setCurrentSrc(fallbackSrc);
      setStatus('loaded');
    } else {
      setStatus('error');
    }
  };

  const handleRetry = () => {
    setUsingFallback(false);
    setStatus('loading');
    setCurrentSrc(src);
  };

  const resolvedAspectRatio =
    aspectRatio && aspectRatio !== 'auto'
      ? aspectRatio
      : width && height
        ? `${width} / ${height}`
        : 'auto';

  return (
    <div
      className={`artwork-frame-container ${fit === 'contain' ? 'is-matted' : 'is-cropped'} ${className}`}
      style={{ aspectRatio: resolvedAspectRatio }}
    >
      {status === 'loading' && (
        <div className="artwork-state-banner artwork-loading-state" role="status" aria-live="polite">
          <span className="artwork-state-indicator" aria-hidden="true" />
          <span>Loading artwork...</span>
        </div>
      )}

      {status === 'error' ? (
        <div className="artwork-state-banner artwork-error-state" role="alert">
          <p className="artwork-state-title">Artwork image could not be loaded</p>
          <p className="artwork-state-detail">
            Check that <code>{src}</code> exists in <code>public/images/</code>.
          </p>
          <button type="button" className="btn-secondary" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          decoding="async"
          {...(priority === 'high'
            ? { fetchPriority: 'high' }
            : { loading: 'lazy' })}
          onLoad={handleLoad}
          onError={handleError}
          className={`artwork-image ${status === 'loaded' ? 'is-loaded' : 'is-loading'}`}
        />
      )}

      {usingFallback && status === 'loaded' && (
        <div className="artwork-fallback-notice" role="status">
          <span>Showing backup artwork image.</span>
          <button type="button" className="btn-inline-link" onClick={handleRetry}>
            Reload original image
          </button>
        </div>
      )}
    </div>
  );
};
