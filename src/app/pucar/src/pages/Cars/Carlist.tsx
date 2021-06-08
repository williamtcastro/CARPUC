import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/PUCAR.png";
import Page from "../../components/Page";

import { RiDeleteBin2Line } from "react-icons/ri";
import { getAuthSelector, setAuth } from "../../reducers/auth.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store.hooks";
import Swal from "sweetalert2";
import { api } from "../../services/api";
import { addCarro, ICarro } from "../../reducers/carro.slice";

const Carlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthSelector);
  const [carroList, setCarrosList] = useState<ICarro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const carrosFiltered = carroList.filter(
    (carro) => carro.condutor === auth.cpf
  );

  const deleteCar = (placa: string) => {
    Swal.fire({
      title: "Excluir veiculo",
      text: "Você realmente excluir veiculo",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Excluir",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/cars/${placa.toUpperCase()}`, {
            headers: {
              "x-access-token": auth.token,
            },
          })
          .then(() => {
            Swal.fire("Sucesso", "", "success").then(() => {
              window.location.reload();
            });
          })
          .catch(() => {
            Swal.fire("Erro", "ocorreu um erro", "warning");
          });
      }
    });
  };

  useEffect(() => {
    api
      .get("/cars", {
        headers: {
          "x-access-token": auth.token,
        },
      })
      .then(({ data }) => {
        data.map((carro: ICarro) => {
          return dispatch(
            addCarro({
              id: carro.id,
              ano: carro.ano,
              assentos_disponiveis: carro.assentos_disponiveis,
              condutor: carro.condutor,
              cor: carro.cor,
              marca_modelo: carro.marca_modelo,
              placa: carro.placa,
              created_at: carro.created_at,
              updated_at: carro.updated_at,
            })
          );
        });
        setCarrosList(data);
        setLoading(false);
      });
  }, [auth, dispatch]);

  return (
    <Page>
      <div className="logo-wrapper">
        <img src={Logo} alt="pucar" className="logo" />
      </div>
      <div className="container-home">
        <div className="name-text">VEÍCULOS</div>
        {loading ? (
          <></>
        ) : (
          carrosFiltered.map((carro: ICarro) => {
            return (
              <Link
                to={`#`}
                className="container-carona container-list-div"
                onClick={() => {}}
              >
                <div
                  className="custom-div-rides-list"
                  style={{ marginLeft: "1rem" }}
                >
                  <div className="condutor-info-details">
                    <div className="mini-text" style={{ marginLeft: "0" }}>
                      <h2>
                        {carro.placa} - {carro.marca_modelo}
                      </h2>
                    </div>
                    <div className="text" style={{ marginLeft: "0" }}></div>
                  </div>
                </div>
                <div
                  className="custom-div-rides-list end"
                  onClick={() => deleteCar(carro.placa)}
                >
                  <div
                    className="custom-rides-tag"
                    style={{
                      backgroundColor: "#ef4b32",
                      borderRadius: "50%",
                    }}
                  >
                    <RiDeleteBin2Line
                      size={30}
                      style={{ display: "flex", flex: "1" }}
                    />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </Page>
  );
};

export default Carlist;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
