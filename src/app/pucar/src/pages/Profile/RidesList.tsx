import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListCarona from "../../components/ListCarona";
import Page from "../../components/Page";
import { getAuthSelector } from "../../reducers/auth.slice";
import Logo from "../../assets/img/PUCAR.png";
import { ICarona } from "../../reducers/caronas.slice";
import {
  addCaronaList,
  getCaronasListSelector,
} from "../../reducers/caronasList.slice";
import { api } from "../../services/api";
import { useAppDispatch } from "../../store.hooks";

import "../styles/ridesList.css";

const RidesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const auth = useSelector(getAuthSelector);
  const caronas = useSelector(getCaronasListSelector);

  useEffect(() => {
    api
      .get(`/rides?status=0&user=${auth.cpf}&flag_u=0&flag_s=0`, {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(({ data }) => {
        const message: ICarona[] = data.message;
        // eslint-disable-next-line array-callback-return
        message.map((carona: ICarona) => {
          return dispatch(
            addCaronaList({
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
    setLoading(true);
  }, [auth, dispatch]);

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-home">
        <div className="name-text">CORRIDAS ANTIGAS</div>
        <div>
          {caronas.length === 0 ? (
            <div className="form-style">Você não possui caronas antigas</div>
          ) : (
            <></>
          )}
          {loading ? (
            caronas.map((carona) => {
              return (
                <ListCarona
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
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </Page>
  );
};

export default RidesList;
