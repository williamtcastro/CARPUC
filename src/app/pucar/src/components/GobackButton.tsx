import React from "react";
import "./styles/GobackButton.css";

import { RiArrowLeftLine } from "react-icons/ri";

interface IGobackButton {
  history: any;
}

const GobackButton: React.FC<IGobackButton> = ({ history }: IGobackButton) => {
  const handleClick = () => {
    history.goBack();
  };

  return (
    <div onClick={handleClick} className="gobackbutton-container">
      <div className="icon">
        <RiArrowLeftLine size={30} className="icon-color"/>
      </div>
    </div>
  );
};

export default GobackButton;
