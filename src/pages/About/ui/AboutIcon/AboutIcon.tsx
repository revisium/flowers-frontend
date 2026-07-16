import type { AboutIconName } from '../../model/aboutPageData';

interface AboutIconProps {
  readonly name: AboutIconName;
  readonly size?: number;
}

export const AboutIcon = ({ name, size = 26 }: AboutIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.45"
      viewBox="0 0 32 32"
      width={size}
    >
      {name === 'leaves' ? (
        <>
          <path d="M7 27c4-7 8-13 17-20" />
          <path d="M10 21C4 20 3 15 4 11c5 0 9 2 9 7" />
          <path d="M16 15c-1-6 3-10 8-11 1 5-1 10-7 12" />
          <path d="M14 18c4-1 7 1 8 5-4 1-7 0-9-3" />
        </>
      ) : null}
      {name === 'plant-card' ? (
        <>
          <path d="M8 25c5-7 10-13 17-18M10 20c-5 0-7-3-7-7 5 0 8 2 8 6m5-5c-1-5 2-9 7-10 1 5-1 9-6 11" />
          <circle cx="7" cy="25" r="2.5" />
          <circle cx="25" cy="7" r="2.5" />
        </>
      ) : null}
      {name === 'camera' ? (
        <>
          <path d="M5 11h5l2-3h8l2 3h5v15H5z" />
          <circle cx="16" cy="18" r="5" />
          <path d="M23 14h1" />
        </>
      ) : null}
      {name === 'care' ? (
        <>
          <path d="M12 24c-5-2-7-7-5-13 5 1 8 5 7 10m3 6V13" />
          <path d="M17 19c6 0 9-4 9-10-6 0-10 4-9 9" />
          <path d="M11 16c2 1 4 3 6 6m6-9c-2 2-4 4-6 7" />
        </>
      ) : null}
      {name === 'note' ? (
        <>
          <path d="M7 25l2-7L22 5l5 5-13 13z" />
          <path d="M19 8l5 5M9 18l5 5M7 25l7-2" />
        </>
      ) : null}
      {name === 'flower' ? (
        <>
          <path d="M16 28V14" />
          <path d="M16 17c-5 0-9-3-8-8 4-1 7 1 8 5 1-4 4-6 8-5 1 5-3 8-8 8Z" />
          <path d="M16 22c-4 0-6 2-7 5m7-5c4 0 6 2 7 5" />
        </>
      ) : null}
      {name === 'sprout' ? (
        <>
          <path d="M16 27V13" />
          <path d="M16 18c-6 0-10-4-9-10 6 0 10 3 9 9Z" />
          <path d="M16 15c0-6 4-9 9-9 1 6-3 10-9 10Z" />
        </>
      ) : null}
      {name === 'pot' || name === 'pot-leaf' ? (
        <>
          <path d="M8 15h16l-2 12H10zM6 11h20v4H6z" />
          {name === 'pot-leaf' ? (
            <>
              <path d="M16 11V5" />
              <path d="M16 8c-4 0-6-2-6-5 4 0 6 2 6 5Zm0 1c4 0 6-2 6-5-4 0-6 2-6 5Z" />
            </>
          ) : (
            <>
              <path d="M16 11V5" />
              <path d="M16 8c-3 0-5-2-5-4 3 0 5 1 5 4" />
            </>
          )}
        </>
      ) : null}
      {name === 'laptop' ? (
        <>
          <rect height="15" rx="1" width="22" x="5" y="6" />
          <path d="M3 25h26l-2-4H5zM14 23h4" />
        </>
      ) : null}
    </svg>
  );
};
