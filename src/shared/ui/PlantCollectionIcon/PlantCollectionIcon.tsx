interface PlantCollectionIconProps {
  readonly size?: number;
}

export const PlantCollectionIcon = ({ size = 22 }: PlantCollectionIconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height={size}
    viewBox="0 0 32 32"
    width={size}
  >
    <path
      d="M16 28V17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.2"
    />
    <path
      d="M15.7 19.4C9.2 19.3 5.4 15.5 6 8.1c6.3-.2 9.8 3.5 9.7 11.3Z"
      fill="currentColor"
      opacity="0.96"
    />
    <path
      d="M16.2 23.4c.1-6.5 3.9-10.2 10.1-10.3.2 6.4-3.6 10.3-10.1 10.3Z"
      fill="currentColor"
      opacity="0.72"
    />
    <path
      d="M16 17.5c-.1-5.8 2.8-9.2 8.3-9.6.5 5.6-2.6 9.2-8.3 9.6Z"
      fill="currentColor"
      opacity="0.46"
    />
    <path
      d="M8.5 10.5c2.9 1.5 4.7 3.4 7 6.8M24 15.2c-2.9 1.5-5.1 3.4-7.6 7M22.3 10.4c-1.9 1.5-3.8 3.5-6.2 6.9"
      fill="none"
      opacity="0.7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.15"
    />
  </svg>
);
