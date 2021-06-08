import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Logo from "../../assets/img/PUCAR.png";
import { Form } from "@unform/web";
import Input from "../../components/input";
import { getAuthSelector } from "../../reducers/auth.slice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { addCarro, ICarro } from "../../reducers/carro.slice";
import { useAppDispatch } from "../../store.hooks";

import "../styles/ridesList.css";
import Swal from "sweetalert2";

const CreateCar: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthSelector);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/cars", {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(({ data }) => {
        data.map((carro: ICarro) => {
          return dispatch(
            addCarro({
              id: carro.id,
              ano: carro.ano,
              assentos_disponiveis: carro.assentos_disponiveis,
              condutor: carro.condutor,
              cor: carro.cor,
              marca_modelo: carro.marca_modelo,
              placa: carro.placa,
              created_at: carro.created_at,
              updated_at: carro.updated_at,
            })
          );
        });
        setLoading(false);
      });
  }, [auth, dispatch]);

  const handleSubmit = (data: ICarro) => {
    Swal.fire("Pedido enviado", "Sua veículo está sendo registrado", "warning");
    api
      .post("/cars", data, {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(() => {
        Swal.fire("Sucesso", "Veículo criado com sucesso", "success").then(() =>
          history.push("/")
        );
      })
      .catch(() =>
        Swal.fire(
          "Erro",
          "ocorreu um erro verifique se não possui um veiculo com esta placa",
          "error"
        )
      );
  };

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-pages-detail">
        <div className="name-text">ADICIONAR CARRO</div>
        <div>
          {loading ? (
            <>
              <div className="form-style">Carregando...</div>
            </>
          ) : (
            <Form onSubmit={handleSubmit} className="form-style">
              <Input
                name="placa"
                styleInput="login"
                placeholder="Placa do Veículo"
                type="text"
              />
              <Input
                name="marca_modelo"
                styleInput="login"
                placeholder="Marca/Modelo do Veículo"
                type="text"
              />
              <Input
                name="ano"
                styleInput="login"
                placeholder="Ano do Veículo"
                type="text"
              />
              <Input
                name="cor"
                styleInput="login"
                placeholder="Cor do Veículo"
                type="text"
              />
              <Input
                name="assentos_disponiveis"
                styleInput="login"
                placeholder="Assentos disponiveis"
                type="number"
                min="1"
                max="1000000000"
                step="1"
              />
              <button type="submit" className="custom-button-login">
                Cadastrar carro
              </button>
            </Form>
          )}
        </div>
      </div>
    </Page>
  );
};

export default CreateCar;
