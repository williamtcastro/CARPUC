import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import Logo from "../../assets/img/PUCAR.png";
import "../styles/ridesDetail.css";
import { getCaronaDetailSelector } from "../../reducers/caronaDetail.slice";
import GobackButton from "../../components/GobackButton";
import { midpoint } from "../../services/midpoint";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import Map from "../../components/Map";
import Button from "../../components/Button";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import { getAuthSelector } from "../../reducers/auth.slice";
import { useAppDispatch } from "../../store.hooks";
import { setCaronaActive } from "../../reducers/caronaActive.slice";

const RidesDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthSelector);
  const caronaDetail = useSelector(getCaronaDetailSelector);
  const history = useHistory();
  const [mapCenter, setMapCenter] = useState<Array<number>>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [depatureHour, setDepatureHour] = useState<Array<Date>>([]);
  const statusCarona = ["", "FINALIZADA", "CANCELADA"];

  const handleCancelCarona = () => {
    const url = `/rides/${caronaDetail.id.toString()}`;

    api
      .put(
        url,
        { status_carona: 2 },
        {
          headers: {
            "x-access-token": `${auth.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Sucesso", "Sua Carona foi cancelada!", "success");
        dispatch(
          setCaronaActive({
            condutor: "",
            desembarque: "",
            desembarque_horario: "",
            embarque: "",
            embarque_horario: "",
            id: 0,
            status_carona: 0,
            valor_carona_por_pessoa: 0,
            veiculo: "",
            desembarque_coordinates: "",
            embarque_coordinates: "",
            nome_completo: "",
          })
        );
      })
      .catch(() => {
        Swal.fire("Erro", "Falha no servidor!", "error");
      });
  };

  const handleFinishCarona = () => {
    const url = `/rides/${caronaDetail.id.toString()}`;

    api
      .put(
        url,
        { status_carona: 1 },
        {
          headers: {
            "x-access-token": `${auth.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Sucesso", "Sua Carona foi finalizada!", "success");
      })
      .catch(() => {
        Swal.fire("Erro", "Falha no servidor!", "error");
      });
  };
  const handleCancel = () => {
    const url = `/passenger/${caronaDetail.id.toString()}`;

    api
      .put(
        url,
        { status_passageiro: 2 },
        {
          headers: {
            "x-access-token": `${auth.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Sucesso", "Sua vaga foi cancelada!", "success");
      })
      .catch(() => {
        Swal.fire("Erro", "Falha no servidor!", "error");
      });
  };

  const handleReserve = () => {
    const url = `/passenger/${caronaDetail.id.toString()}`;

    api
      .post(
        url,
        {},
        {
          headers: {
            "x-access-token": `${auth.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Sucesso", "Sua vaga foi requisitada!", "success");
        history.push("/");
      })
      .catch(() => {
        Swal.fire("Erro", "Você já tem uma carona ativa.", "error");
      });
  };

  useEffect(() => {
    const eH = new Date(caronaDetail.embarque_horario);
    const dH = new Date(caronaDetail.desembarque_horario);
    const { embarque_coordinates, desembarque_coordinates } = caronaDetail;
    const eC = embarque_coordinates.split(",");
    const dC = desembarque_coordinates.split(",");
    const mPX = midpoint(eC[0], dC[0]);
    const mPY = midpoint(eC[1], dC[1]);
    setDepatureHour([eH, dH]);
    setMapCenter([mPX, mPY]);
    setLoading(false);
  }, [caronaDetail]);

  // const { id } = useParams<RouteParams>();
  return (
    <Page>
      <GobackButton history={history} />
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-pages-detail">
        <div className="caronadetail-condutor-info">
          <div className="caronadetail-picPlaceholder">&nbsp;</div>
          <div className="caronadetail-condutor-info-details">
            <div className="caronadetail-mini-text">Condutor(a)</div>
            <div className="caronadetail-text">
              {caronaDetail.nome_completo}
            </div>
          </div>
        </div>
        {!loading ? (
          <div className="caronadetail-info">
            <div className="caronadetail-info-container">
              <div className="caronadetail-saida">
                <RiUserReceivedLine size={25} style={{ display: "flex" }} />
              </div>
              <div className="caronadetail-info-detail">
                <div>{caronaDetail.embarque}</div>
                <div className="caronadetail-info-detail-hour">
                  {depatureHour[0].getHours() +
                    ":" +
                    depatureHour[0].getMinutes()}
                </div>
              </div>
            </div>
            <div className="caronadetail-info-container">
              <div className="caronadetail-chegada">
                <RiUserSharedLine size={25} style={{ display: "flex" }} />
              </div>
              <div className="caronadetail-info-detail">
                <div>{caronaDetail.desembarque}</div>
                <div className="caronadetail-info-detail-hour">
                  {depatureHour[1].getHours() +
                    ":" +
                    depatureHour[1].getMinutes()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {!loading ? (
          <Map center={[mapCenter[0], mapCenter[1]]} height="300px" />
        ) : (
          ""
        )}
        <div>
          {caronaDetail.is_active ? (
            caronaDetail.is_owner ? (
              <div>
                <div onClick={handleFinishCarona}>
                  <Button
                    color="#fdfdfd"
                    backgroundColor="#ff8000"
                    margin="1rem 0 0 0"
                  >
                    FINALIZAR CARONA
                  </Button>
                </div>
                <div onClick={handleCancelCarona}>
                  <Button
                    color="#fdfdfd"
                    backgroundColor="#ef4b32"
                    margin="1rem 0 0 0"
                  >
                    CANCELAR CARONA
                  </Button>
                </div>
              </div>
            ) : (
              <div onClick={handleCancel}>
                <Button
                  color="#fdfdfd"
                  backgroundColor="#ef4b32"
                  margin="1rem 0 0 0"
                >
                  CANCELAR LUGAR
                </Button>
              </div>
            )
          ) : caronaDetail.status_carona === 0 ? (
            <div onClick={handleReserve}>
              <Button
                color="#fdfdfd"
                backgroundColor="#1b98e0"
                margin="1rem 0 0 0"
              >
                RESERVAR LUGAR
              </Button>
            </div>
          ) : caronaDetail.status_carona === 1 ? (
            <Button
              color="#fdfdfd"
              backgroundColor="#ff8000"
              margin="1rem 0 0 0"
            >
              {statusCarona[caronaDetail.status_carona]}
            </Button>
          ) : (
            <Button
              color="#fdfdfd"
              backgroundColor="#ef4b32"
              margin="1rem 0 0 0"
            >
              {statusCarona[caronaDetail.status_carona]}
            </Button>
          )}
        </div>
      </div>
    </Page>
  );
};

export default RidesDetail;
