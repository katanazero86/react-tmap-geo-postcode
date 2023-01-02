import { Dispatch, SetStateAction } from "react";

interface CloseProps {
  size?: number;
  color?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Close({
  size = 30,
  color = "black",
  setIsOpen,
}: CloseProps) {
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <path
        fill="currentColor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      ></path>
    </svg>
  );
}
