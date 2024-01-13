import React from "react";

const ActiveIcon = ({ profile }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <g clipPath="url(#clip0_934_20497)">
        <circle cx="8.5" cy="8" r="8" fill="white" />
        <circle
          cx="8.4994"
          cy="7.9994"
          r="5.53846"
          fill={
            profile.status === "true"
              ? "#09D785"
              : profile.status === "false"
              ? "red"
              : "black"
          }
        />
      </g>
      <defs>
        <clipPath id="clip0_934_20497">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ActiveIcon;
