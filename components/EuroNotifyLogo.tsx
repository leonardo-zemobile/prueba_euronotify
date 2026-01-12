import React from "react";

type Props = {
  className?: string;
};

export default function EuroNotifyLogo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M20 4.8c4.2 3.2 9 4.2 12.3 4.7v11.4c0 8.1-5.4 13.9-12.3 16.3C13.1 34.8 7.7 29 7.7 20.9V9.5C11 9 15.8 8 20 4.8Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Check */}
      <path
        d="M14.8 20.6l3.1 3.2 7.4-7.7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
