interface ChevronRightProps {
  size?: number;
  color?: string;

  onClick(): void;
}

export default function ChevronRight({
  size = 24,
  color = "black",
  onClick,
}: ChevronRightProps) {
  const handleClick = () => {
    onClick();
  };
  return (
    <svg
      width={size}
      height={size}
      color={color}
      onClick={handleClick}
      viewBox="0 0 24 24"
      style={{
        cursor: "pointer",
      }}
    >
      <path
        fill="currentColor"
        d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      ></path>
    </svg>
  );
}
