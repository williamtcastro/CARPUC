import React from "react";

import "./styles/caronaContainer.css";
import Map from "./Map";

const CaronaContainer: React.FC = () => {
  return (
    <div className="container-carona">
      <div className="text">oi</div>
      <Map center={[-21.7885543,-46.5630502]}/>
    </div>
  );
};

export default CaronaContainer;
