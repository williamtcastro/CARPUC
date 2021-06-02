import React from "react";

import "./styles/ListCarona.css";

import { ICarona } from "../reducers/caronas.slice";
import { setCaronaDetail } from "../reducers/caronaDetail.slice";
import { useAppDispatch } from "../store.hooks";
import { Link } from "react-router-dom";

const ListCarona: React.FC<ICarona> = (props: ICarona) => {
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
        is_active: false,
      })
    );
  };

  return (
    <Link
      to={`/rides/${props.id}`}
      className="container-carona container-list-div"
      onClick={handleClick}
    >
      <div className="custom-div-rides-list" style={{ marginLeft: "1rem" }}>
        <div className="condutor-info-details">
          <div className="mini-text" style={{ marginLeft: "0" }}>
            Condutor(a)
          </div>
          <div className="text" style={{ marginLeft: "0" }}>
            {props.nome_completo}
          </div>
        </div>
      </div>
      {/* <div
        className="custom-div-rides-list"
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        <div>
          <div>DATA DA CORRIDA</div>
          <div className="date">
            {dateInitial.getDate() +
              "/" +
              dateInitial.getMonth() +
              "/" +
              dateInitial.getFullYear()}
          </div>
        </div>
      </div> */}
      <div className="custom-div-rides-list end">
        <div
          className="custom-rides-tag"
          style={{
            backgroundColor: props.status_carona === 2 ? "#ef4b32" : "#ff8000",
          }}
        >
          {props.status_carona === 1
            ? "FINALIZADA"
            : props.status_carona === 2
            ? "CANCELADA"
            : ""}
        </div>
      </div>
    </Link>
  );
};

export default ListCarona;
