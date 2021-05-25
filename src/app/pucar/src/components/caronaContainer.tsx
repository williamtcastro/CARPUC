import React, { useEffect, useState } from "react";

import "./styles/caronaContainer.css";
import Map from "./Map";
import Button from "./Button";
import { ICarona } from "../reducers/caronas.slice";
import { midpoint } from "../services/midpoint";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import { setCaronaDetail } from "../reducers/caronaDetail.slice";
import { Tooltip } from "react-tippy";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store.hooks";

const CaronaContainer: React.FC<ICarona> = (props: ICarona) => {
  const [mapCenter, setMapCenter] = useState<Array<number>>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [depatureHour, setDepatureHour] = useState<Array<Date>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const eH = new Date(props.embarque_horario);
    const dH = new Date(props.desembarque_horario);
    const { embarque_coordinates, desembarque_coordinates } = props;
    const eC = embarque_coordinates.split(",");
    const dC = desembarque_coordinates.split(",");
    const mPX = midpoint(eC[0], dC[0]);
    const mPY = midpoint(eC[1], dC[1]);
    setDepatureHour([eH, dH]);
    setMapCenter([mPX, mPY]);
    setLoading(false);
  }, [props]);

  const handleClick = () => {
    dispatch(setCaronaDetail({
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
    }))
  };

  return (
    <div className="container-carona">
      <div className="container-header">
        <div className="condutor-info">
          <div className="picPlaceholder">&nbsp;</div>
          <div className="condutor-info-details">
            <div className="mini-text">Condutor(a)</div>
            <div className="text">{props.nome_completo}</div>
          </div>
        </div>
        {loading ? (
          <></>
        ) : (
          <div className="info">
            <div className="info-container">
              <Tooltip title={"Local de saida"} size="big">
                <div className="saida">
                  <RiUserReceivedLine size={25} style={{ display: "flex" }} />
                </div>
              </Tooltip>
              <div className="info-detail">
                <div>{props.embarque}</div>
                <div className="info-detail-hour">
                  {depatureHour[0].getHours() +
                    ":" +
                    depatureHour[0].getMinutes()}
                </div>
              </div>
            </div>
            <div className="info-container">
              <Tooltip title={"Local de chegada"} size="big">
                <div className="chegada">
                  <RiUserSharedLine size={25} style={{ display: "flex" }} />
                </div>
              </Tooltip>
              <div className="info-detail">
                <div>{props.desembarque}</div>
                <div className="info-detail-hour">
                  {depatureHour[1].getHours() +
                    ":" +
                    depatureHour[1].getMinutes()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {loading ? "" : <Map center={[mapCenter[0], mapCenter[1]]} height="150px"/>} */}
      {/* <div className="double-btn">
        <Button
          color="#f1f1f1"
          backgroundColor="#afd275"
          onClick={handleClick}
          margin="0 0.5rem 0 0"
        >
          MAIS INFORMAÇÕES
        </Button>
        <Button
          color="#f1f1f1"
          backgroundColor="#ef4b32"
          onClick={handleClick}
          margin="0 0 0 0.5rem"
        >
          tchau
        </Button>
      </div> */}
      <Link to={`/rides/${props.id}`} onClick={handleClick}>
        <Button color="#f1f1f1" backgroundColor="#afd275" margin="1rem 0 0 0">
          MAIS INFORMAÇÕES
        </Button>
      </Link>
    </div>
  );
};

export default CaronaContainer;
