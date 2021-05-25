import React from "react";

import "./styles/Button.css";

interface IButton {
  children?: React.ReactNode;
  margin?: string;
  color: string;
  backgroundColor: string;
}

const Button: React.FC<IButton> = ({
  children,
  margin,
  color,
  backgroundColor,
}) => {
  return (
    <div
      className="button"
      style={{
        margin,
        backgroundColor,
        color,
      }}
    >
      {children}
    </div>
  );
};

export default Button;
