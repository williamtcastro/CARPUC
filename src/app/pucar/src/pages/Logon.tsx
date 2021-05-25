import React, { useEffect } from "react";
import { Form } from "@unform/web";
import Input from "../components/input";
import Swal from "sweetalert2";

import "./styles/login.css";
import Logo from "../assets/img/PUCAR.png";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthSelector } from "../reducers/auth.slice";

interface ILogon {
  name: string;
  email: string;
  password: string;
  celular: number;
  cpf: number;
  genero: number;
}

function handleSubmit(data: ILogon) {
  console.log(data);
  Swal.fire({
    title: data.name,
    icon: "success",
  });
}

const Logon: React.FC = () => {
  const history = useHistory();
  const auth = useSelector(getAuthSelector);

  useEffect(() => {
    if (auth.authStatus) {
      history.push("/");
    }
  }, [auth.authStatus, history]);

  return (
    <div id="page-login">
      <div className="content-wrapper">
        <div className="logo-wrapper">
          <img src={Logo} alt="pucar" className="logo" />
        </div>
        <div className="content-block">
          <div style={{ margin: "10px" }}>
            <h1>Cadastre-se</h1>
            <p className="description">
              não possui uma conta, crie uma usando seu email da PUCMINAS!
            </p>
          </div>
          <div>
            <Form onSubmit={handleSubmit} className="form-style">
              <Input
                name="name"
                styleInput="login"
                placeholder="Nome completo"
                type="text"
              />
              <Input
                name="cpf"
                styleInput="login"
                placeholder="CPF"
                type="number"
              />
              <Input
                name="celular"
                styleInput="login"
                placeholder="Celular"
                type="number"
              />
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
                Criar Conta
              </button>
            </Form>
            <Link
              to="/account"
              style={{ color: "#006494" }}
              className="custom-button-logon"
            >
              Possui uma conta ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logon;
