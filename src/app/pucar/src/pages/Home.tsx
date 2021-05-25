import React, { useEffect } from "react";

import "./styles/home.css";
import CaronaContainer from "../components/caronaContainer";
import Logo from "../assets/img/PUCAR.png";
import { useSelector } from "react-redux";
import {
  getCaronasSelector,
  ICarona,
  addCarona,
} from "../reducers/caronas.slice";
import { api } from "../services/api";
import { getAuthSelector, logOut } from "../reducers/auth.slice";
import { useAppDispatch } from "../store.hooks";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Page from "../components/Page";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthSelector);
  const history = useHistory();

  useEffect(() => {
    api
      .get("/token", {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(() => {
        api
          .get("/rides?status=0", {
            headers: {
              "x-access-token": auth.token,
            },
          })
          .then(({ data }) => {
            const message: ICarona[] = data.message;
            // eslint-disable-next-line array-callback-return
            message.map((carona: ICarona) => {
              return dispatch(
                addCarona({
                  condutor: carona.condutor,
                  desembarque: carona.desembarque,
                  desembarque_horario: carona.desembarque_horario,
                  embarque: carona.embarque,
                  embarque_horario: carona.embarque_horario,
                  id: carona.id,
                  status_carona: carona.status_carona,
                  valor_carona_por_pessoa: carona.valor_carona_por_pessoa,
                  veiculo: carona.veiculo,
                  desembarque_coordinates: carona.desembarque_coordinates,
                  embarque_coordinates: carona.embarque_coordinates,
                  nome_completo: carona.nome_completo,
                })
              );
            });
          });
      })
      .catch(() => {
        dispatch(logOut(false));
        Swal.fire(
          "Logado em outro dispositivo",
          "Será redirecionado para o login",
          "warning"
        ).then(() => {
          history.push("/");
        });
      });
  }, [auth, dispatch, history]);

  const caronas = useSelector(getCaronasSelector);
  return (
    <Page>
        <div className="logo-wrapper">
          <img src={Logo} alt="pucar" className="logo" />
        </div>
        <div className="container-home">
          <div className="caronas-grid">
            {caronas.map((carona) => (
              <CaronaContainer
                key={carona.id}
                id={carona.id}
                veiculo={carona.veiculo}
                condutor={carona.condutor}
                embarque={carona.embarque}
                desembarque={carona.desembarque}
                embarque_horario={carona.embarque_horario}
                desembarque_horario={carona.desembarque_horario}
                valor_carona_por_pessoa={carona.valor_carona_por_pessoa}
                status_carona={carona.status_carona}
                nome_completo={carona.nome_completo}
                desembarque_coordinates={carona.desembarque_coordinates}
                embarque_coordinates={carona.embarque_coordinates}
              />
            ))}
          </div>
        </div>
    </ Page>
  );
};

export default Home;
