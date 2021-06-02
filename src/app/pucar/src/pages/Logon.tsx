import React, { useEffect } from "react";
import { Form } from "@unform/web";
import Input from "../components/input";
import Swal from "sweetalert2";

import "./styles/login.css";
import Logo from "../assets/img/PUCAR.png";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthSelector } from "../reducers/auth.slice";
// import Radio from "../components/radio";
import Select from "../components/select";
import { api } from "../services/api";

interface ILogon {
  name: string;
  email: string;
  password: string;
  celular: number;
  cpf: number;
  genero: number;
}

const selectOptions = [
  { value: "genero", label: "Gênero" },
  { value: 0, label: "Masculino" },
  { value: 1, label: "Feminino" },
  { value: 2, label: "Outros" },
];

const Logon: React.FC = () => {
  const history = useHistory();
  const auth = useSelector(getAuthSelector);

  useEffect(() => {
    if (auth.authStatus) {
      history.push("/");
    }
  }, [auth.authStatus, history]);

  const handleSubmit = (data: ILogon) => {
    api
      .post("/register", data)
      .then(() => {
        Swal.fire(
          "Sucesso",
          "Conta criada com sucesso! Acesse seu email para confirmar sua conta",
          "success"
        ).then(() => history.push("/account"));
      })
      .catch((e) => {
        Swal.fire("Erro", e.toString(), "warning");
      });
  };

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
                name="nome"
                styleInput="login"
                placeholder="Nome completo"
                type="text"
              />
              <Select
                name="genero"
                label="Genero"
                styleInput="login"
                options={selectOptions}
              >
                {selectOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    style={{ minWidth: "100%" }}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
              {/* <Radio name="genero" label="Genero" options={radioOptions} /> */}
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
                name="senha"
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
