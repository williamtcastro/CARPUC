import React, { useEffect, useState } from "react";

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
import { setActionIndex } from "../reducers/actionIndex.slice";
import CaronaActive from "../components/CaronaActive";
import {
  getCaronaActiveSelector,
  setCaronaActive,
} from "../reducers/caronaActive.slice";

const Home: React.FC = () => {
  const [isCaronaActive, setIsCaronaActive] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthSelector);
  const caronas = useSelector(getCaronasSelector);
  const caronaActive = useSelector(getCaronaActiveSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(setActionIndex({ index: 0 }));
    api
      .get("/token", {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(() => {
        api
          .get(`/rides?status=0&user=${auth.cpf}&flag_u=0&flag_s=1`, {
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

            api
              .get("/rides/active", {
                headers: {
                  "x-access-token": auth.token,
                },
              })
              .then(({ data }) => {
                const carona: ICarona = data.message;
                console.log(carona);
                dispatch(
                  setCaronaActive({
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
                setIsCaronaActive(true);
              })
              .catch(() => {});
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

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-home">
        {isCaronaActive ? (
          <div>
            <CaronaActive
              key={caronaActive.id}
              id={caronaActive.id}
              veiculo={caronaActive.veiculo}
              condutor={caronaActive.condutor}
              embarque={caronaActive.embarque}
              desembarque={caronaActive.desembarque}
              embarque_horario={caronaActive.embarque_horario}
              desembarque_horario={caronaActive.desembarque_horario}
              valor_carona_por_pessoa={caronaActive.valor_carona_por_pessoa}
              status_carona={caronaActive.status_carona}
              nome_completo={caronaActive.nome_completo}
              desembarque_coordinates={caronaActive.desembarque_coordinates}
              embarque_coordinates={caronaActive.embarque_coordinates}
            />
          </div>
        ) : (
          <></>
        )}

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
    </Page>
  );
};

export default Home;
