import React from "react";

import "./styles/ListCarona.css";

import { ICarona } from "../reducers/caronas.slice";
import { setCaronaDetail } from "../reducers/caronaDetail.slice";
import { useAppDispatch } from "../store.hooks";
import { Link } from "react-router-dom";

const CaronaActive: React.FC<ICarona> = (props: ICarona) => {
  const dispatch = useAppDispatch();
  // const dateInitial = new Date(props.desembarque_horario);

  const handleClick = () => {
    dispatch(
      setCaronaDetail({
        condutor: props.condutor,
        desembarque: props.desembarque,
        desembarque_coordinates: props.desembarque_coordinates,
        desembarque_horario: props.desembarque_horario,
        embarque: props.embarque,
        embarque_coordinates: props.embarque_coordinates,
        embarque_horario: props.embarque_horario,
        id: props.id,
        nome_completo: props.nome_completo,
        status_carona: props.status_carona,
        valor_carona_por_pessoa: props.valor_carona_por_pessoa,
        veiculo: props.veiculo,
        is_active: true,
      })
    );
  };

  return (
    <Link
      to={`/rides/${props.id}`}
      className="container-carona container-list-div"
      onClick={handleClick}
      style={{
        color: "#fefbfb",
        backgroundColor: "#b3e85f",
      }}
    >
      <div
        className="custom-div-rides-list"
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        CARONA ATIVA
      </div>
    </Link>
  );
};

export default CaronaActive;
