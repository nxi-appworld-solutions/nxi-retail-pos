const NonVegIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-label="Non Vegetarian"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="2"
      ry="2"
      fill="none"
      stroke="#D40000"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="5" fill="#D40000" />
  </svg>
);

export default NonVegIcon;
