import React from 'react';

interface IconProps {
  className?: string;
}

export const MusicNoteIcon: React.FC<IconProps> = ({ className = 'ui-icon' }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 18V5l10-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="16" cy="16" r="3" />
  </svg>
);

export const PlayTriangleIcon: React.FC<IconProps> = ({ className = 'ui-icon' }) => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

export const PauseBarsIcon: React.FC<IconProps> = ({ className = 'ui-icon' }) => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const VolumeIcon: React.FC<IconProps & { muted?: boolean }> = ({
  muted = false,
  className = 'ui-icon',
}) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    {muted ? (
      <>
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </>
    ) : (
      <>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    )}
  </svg>
);

export const ZoomLoupeIcon: React.FC<IconProps> = ({ className = 'ui-icon' }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.2" y2="16.2" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const ChevronIcon: React.FC<IconProps & { direction?: 'up' | 'down' | 'left' | 'right' }> = ({
  direction = 'down',
  className = 'ui-icon',
}) => {
  const rotation =
    direction === 'up'
      ? '180deg'
      : direction === 'left'
        ? '90deg'
        : direction === 'right'
          ? '-90deg'
          : '0deg';
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation})` }}
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};
