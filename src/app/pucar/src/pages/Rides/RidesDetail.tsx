import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Page from "../../components/Page";
import "../styles/ridesDetail.css";
import { getCaronaDetailSelector } from "../../reducers/caronaDetail.slice";
import GobackButton from "../../components/GobackButton";
import { midpoint } from "../../services/midpoint";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import Map from "../../components/Map";
import Button from "../../components/Button";

interface RouteParams {
  id: string;
}

const RidesDetail: React.FC = () => {
  const caronaDetail = useSelector(getCaronaDetailSelector);
  const history = useHistory();
  const [mapCenter, setMapCenter] = useState<Array<number>>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [depatureHour, setDepatureHour] = useState<Array<Date>>([]);

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
          <Button color="#f1f1f1" backgroundColor="#1b98e0" margin="1rem 0 0 0">
            RESERVAR LUGAR
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default RidesDetail;
