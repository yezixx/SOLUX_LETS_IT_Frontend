const CheckIcon = ({
  width = "20px",
  height = "20px",
  color = "var(--text-color1)",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    className="size-6"
    stroke={color}
    width={width}
    height={height}
  >
    <path strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default CheckIcon;
