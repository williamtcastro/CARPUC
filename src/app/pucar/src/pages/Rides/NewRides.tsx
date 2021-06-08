import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Logo from "../../assets/img/PUCAR.png";
import { Form } from "@unform/web";
import Input from "../../components/input";
import Select from "../../components/select";
import { getAuthSelector } from "../../reducers/auth.slice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { addCarro, ICarro } from "../../reducers/carro.slice";
import { useAppDispatch } from "../../store.hooks";

import "../styles/ridesList.css";

const NewRides: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthSelector);
  const [carroList, setCarrosList] = useState<ICarro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const carrosFiltered = carroList.filter(
    (carro) => carro.condutor === auth.cpf
  );

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
        setCarrosList(data);
        setLoading(false);
      });
  }, [auth, dispatch]);

  const handleSubmit = () => {};

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-pages-detail">
        <div className="name-text">CRIAR CARONA</div>
        <div>
          {loading ? (
            <>
              <div className="form-style">Carregando...</div>
            </>
          ) : carrosFiltered.length === 0 ? (
            <div className="form-style">
              <div>Voce não possui um veiculo cadastrado</div>
              <button
                onClick={() => history.push("/profile/cars/new")}
                className="custom-button-login"
              >
                Criar veiculo
              </button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="form-style">
              <Input
                name="embarque"
                styleInput="login"
                placeholder="Local de Embarque"
                type="text"
              />
              <Input
                name="embarquehora"
                styleInput="login"
                placeholder="Horário de Embarque"
                type="time"
              />
              <Input
                name="desembarque"
                styleInput="login"
                placeholder="Local de Desembarque"
                type="text"
              />
              <Input
                name="desembarquehora"
                styleInput="login"
                placeholder="Horário de Desembarque"
                type="time"
              />
              <Input
                name="valorporpessoa"
                styleInput="login"
                placeholder="Valor por pessoa"
                type="number"
                min="0.00"
                max="1000000000.00"
                step="0.01"
              />
              <Select
                name="veiculo"
                label="veiculo"
                styleInput="login"
                options={carrosFiltered}
              >
                {carrosFiltered.map((option) => (
                  <option
                    key={option.id}
                    value={option.placa}
                    style={{ minWidth: "100%" }}
                  >
                    {"Veiculo: " +
                      option.marca_modelo +
                      " | Placa: " +
                      option.placa}
                  </option>
                ))}
              </Select>
              <button type="submit" className="custom-button-login">
                Entrar
              </button>
            </Form>
          )}
        </div>
      </div>
    </Page>
  );
};

export default NewRides;
