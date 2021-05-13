import React from "react";

import "./styles/home.css";
import CaronaContainer from '../components/caronaContainer';
import Logo from "../assets/img/PUCAR.png";

const Home: React.FC = () => {
  return (
    <div className="bg-main">
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-home">
        <CaronaContainer />
      </div>
    </div>
  );
};

export default Home;
