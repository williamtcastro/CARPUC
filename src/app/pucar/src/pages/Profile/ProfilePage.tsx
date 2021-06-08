import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/PUCAR.png";
import Page from "../../components/Page";

import { RiArrowRightLine } from "react-icons/ri";
import { getAuthSelector, setAuth } from "../../reducers/auth.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store.hooks";
import Swal from "sweetalert2";

const ProfilePage: React.FC = () => {
  const auth = useSelector(getAuthSelector);
  const dispatch = useAppDispatch();

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-home">
        <div className="caronadetail-condutor-info" style={{ padding: "1rem" }}>
          <div className="caronadetail-picPlaceholder">&nbsp;</div>
          <div className="caronadetail-text" style={{ padding: "1rem" }}>
            {auth.nome_completo.toUpperCase()}
          </div>
        </div>
        <Link
          to={`/profile/cars`}
          className="container-carona container-list-div"
          onClick={() => {}}
        >
          <div className="custom-div-rides-list" style={{ marginLeft: "1rem" }}>
            <div className="condutor-info-details">
              <div className="mini-text" style={{ marginLeft: "0" }}>
                <h2>Veiculos</h2>
              </div>
              <div className="text" style={{ marginLeft: "0" }}></div>
            </div>
          </div>
          <div className="custom-div-rides-list end">
            <div
              className="custom-rides-tag"
              style={{
                backgroundColor: "#13293D",
                borderRadius: "50%",
              }}
            >
              <RiArrowRightLine
                size={30}
                style={{ display: "flex", flex: "1" }}
              />
            </div>
          </div>
        </Link>
        <Link
          to={`#`}
          className="container-carona container-list-div"
          onClick={() => {
            Swal.fire("Aguarde", "Funcionalidade em desenvolvimento", "info");
          }}
        >
          <div className="custom-div-rides-list" style={{ marginLeft: "1rem" }}>
            <div className="condutor-info-details">
              <div className="mini-text" style={{ marginLeft: "0" }}>
                <h2>Reembolso</h2>
              </div>
              <div className="text" style={{ marginLeft: "0" }}></div>
            </div>
          </div>
          <div className="custom-div-rides-list end">
            <div
              className="custom-rides-tag"
              style={{
                backgroundColor: "#13293D",
              }}
            >
              EM DESENVOLVIMENTO
            </div>
          </div>
        </Link>
        <Link
          to={`#`}
          style={{ marginBottom: "8rem" }}
          className="container-carona container-list-div"
          onClick={() => {
            Swal.fire({
              title: "Deslogar",
              text: "Você realmente deseja sair",
              icon: "warning",
              showConfirmButton: true,
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              confirmButtonText: "Deslogar",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                dispatch(
                  setAuth({
                    authStatus: false,
                    id: 0,
                    cpf: "",
                    bio: "",
                    token: "",
                    celular: "",
                    email: "",
                    genero: "",
                    nome_completo: "",
                    tier: 0,
                  })
                );
              }
            });
          }}
        >
          <div className="custom-div-rides-list" style={{ marginLeft: "1rem" }}>
            <div className="condutor-info-details">
              <div className="mini-text" style={{ marginLeft: "0" }}>
                <h2>Deslogar</h2>
              </div>
              <div className="text" style={{ marginLeft: "0" }}></div>
            </div>
          </div>
          <div className="custom-div-rides-list end">
            <div
              className="custom-rides-tag"
              style={{
                backgroundColor: "#ef4b32",
                borderRadius: "50%",
              }}
            >
              <RiArrowRightLine
                size={30}
                style={{ display: "flex", flex: "1" }}
              />
            </div>
          </div>
        </Link>
      </div>
    </Page>
  );
};

export default ProfilePage;
