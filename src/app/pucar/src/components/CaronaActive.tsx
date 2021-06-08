import React from "react";

import "./styles/ListCarona.css";

import { ICaronaDetail } from "../reducers/caronaDetail.slice";
import { setCaronaDetail } from "../reducers/caronaDetail.slice";
import { useAppDispatch } from "../store.hooks";
import { Link } from "react-router-dom";

const CaronaActive: React.FC<ICaronaDetail> = (props: ICaronaDetail) => {
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
        is_owner: props.is_owner,
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
        backgroundColor: props.is_owner ? "#ef4b32" : "#b3e85f",
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
        {props.is_owner ? "CONDUTOR ATIVO": "CARONA ATIVA"}
      </div>
    </Link>
  );
};

export default CaronaActive;
