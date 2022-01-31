import React from "react";

type Props = {
  width: number;
  height: number;
  color: string;
};

const IconCheck = ({ width, height, color }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 8">
      <path
        d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z"
        fill={color}
      />
    </svg>
  );
};

export default IconCheck;
