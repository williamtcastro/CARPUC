import React, { useEffect } from "react";
import { Form } from "@unform/web";
import Input from "../components/input";

import "./styles/login.css";
import Logo from "../assets/img/PUCAR.png";
import { Link, useHistory } from "react-router-dom";
import { api } from "../services/api";
import { useAppDispatch } from "../store.hooks";
import { getAuthSelector, setAuth } from "../reducers/auth.slice";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

interface ILogin {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthSelector);
  const history = useHistory();

  useEffect(() => {
    if (auth.authStatus) {
      history.push("/");
    }
  }, [auth.authStatus, history]);

  const handleSubmit = (data: ILogin) => {
    api
      .post("/login", data)
      .then(({ data }) => {
        const { message } = data;
        const { person, token } = message;
        dispatch(
          setAuth({
            authStatus: true,
            id: person.id,
            cpf: person.cpf,
            bio: person.bio,
            token: token,
            celular: person.celular,
            email: person.email,
            genero: person.genero,
            nome_completo: person.nome_completo,
            tier: person.tier,
          })
        );
        Swal.fire("Sucesso", "Logado com sucesso!", "success").then(() =>
          history.push("/")
        );
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
              name="senha"
              styleInput="login"
              placeholder="Senha"
              type="password"
            />
            <button type="submit" className="custom-button-login">
              Entrar
            </button>
          </Form>
          <Link
            to="/account/logon"
            style={{ color: "#006494" }}
            className="custom-button-logon"
          >
            Cadastrar-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
