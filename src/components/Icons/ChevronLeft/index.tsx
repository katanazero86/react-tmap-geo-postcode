interface ChevronLeftProps {
  size?: number;
  color?: string;

  onClick(): void;
}

export default function ChevronLeft({
  size = 24,
  color = "black",
  onClick,
}: ChevronLeftProps) {
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
        d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      ></path>
    </svg>
  );
}
