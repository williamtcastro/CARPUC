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
import { ICarona } from "../../reducers/caronas.slice";
import Swal from "sweetalert2";
import { setCaronaDetail } from "../../reducers/caronaDetail.slice";

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

  const handleSubmit = (data: ICarona) => {
    Swal.fire("Pedido enviado", "Sua carona está sendo registrada", "warning");
    api
      .post(
        "/rides",
        {
          veiculo: data.veiculo,
          embarque: data.embarque,
          desembarque: data.desembarque,
          valor_carona_por_pessoa: Number(data.valor_carona_por_pessoa),
          embarque_horario: data.embarque_horario,
          desembarque_horario: data.desembarque_horario,
        },
        {
          headers: {
            "x-access-token": auth.token,
          },
        }
      )
      .then(({ data }) => {
        const m: ICarona = data.message;
        Swal.fire("Sucesso", "Carona criada com sucesso", "success");
        dispatch(
          setCaronaDetail({
            condutor: m.condutor,
            desembarque: m.desembarque,
            desembarque_coordinates: m.desembarque_coordinates,
            desembarque_horario: m.desembarque_horario,
            embarque: m.embarque,
            embarque_coordinates: m.embarque_coordinates,
            embarque_horario: m.embarque_horario,
            id: m.id,
            is_active: true,
            is_owner: true,
            nome_completo: m.nome_completo,
            status_carona: m.status_carona,
            valor_carona_por_pessoa: m.valor_carona_por_pessoa,
            veiculo: m.veiculo,
          })
        );

        setTimeout(() => {
          history.push(`/rides/${data.id}`);
        }, 300);
      })
      .catch(() =>
        Swal.fire(
          "Erro",
          "ocorreu um erro verifique se não possui uma carona ativa",
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
                required={true}
              />
              <Input
                name="embarque_horario"
                styleInput="login"
                placeholder="Horário de Embarque"
                type="time"
                required={true}
              />
              <Input
                name="desembarque"
                styleInput="login"
                placeholder="Local de Desembarque"
                type="text"
                required={true}
              />
              <Input
                name="desembarque_horario"
                styleInput="login"
                placeholder="Horário de Desembarque"
                type="time"
                required={true}
              />
              <Input
                name="valor_carona_por_pessoa"
                styleInput="login"
                placeholder="Valor por pessoa"
                type="number"
                min="0.00"
                max="1000000000.00"
                step="0.01"
                required={true}
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
                Criar corrida
              </button>
            </Form>
          )}
        </div>
      </div>
    </Page>
  );
};

export default NewRides;
