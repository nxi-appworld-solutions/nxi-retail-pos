const VegIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-label="Vegetarian"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="2"
      ry="2"
      fill="none"
      stroke="#1FA800"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="5" fill="#1FA800" />
  </svg>
);

export default VegIcon;
