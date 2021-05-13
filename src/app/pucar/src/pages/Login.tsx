import React from "react";
import { Form } from "@unform/web";
import Input from "../components/input";

import "./styles/login.css";
import Logo from "../assets/img/PUCAR.png";
import { Link } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}

function handleSubmit(data: ILogin) {
  alert(data.email);
  alert(data.password);
}

const Login: React.FC = () => {
  return (
    <div id="page-login">
      <div className="content-wrapper">
        <div className="logo-wrapper">
          <img src={Logo} alt="pucar" className="logo" />
        </div>
        <div className="content-block">
          <div>
            <h1 style={{ margin: "10px" }}>Login</h1>
          </div>
          <Form onSubmit={handleSubmit} className="form-style">
            <Input
              name="email"
              styleInput="login"
              placeholder="E-mail"
              type="email"
            />
            <Input
              name="password"
              styleInput="login"
              placeholder="Senha"
              type="password"
            />
            <button type="submit" className="custom-button-login">
              Entrar
            </button>
          </Form>
          <Link to="/account/logon" style={{ color: "#006494" }} className="custom-button-logon">
            Cadastrar-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
