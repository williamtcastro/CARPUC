import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICarona } from "./caronas.slice";

export interface ICaronaDetail extends ICarona {
  is_active: boolean;
  is_owner?: boolean;
}

const initialState: ICaronaDetail = {
  id: 0,
  veiculo: "",
  condutor: "",
  embarque: "",
  embarque_coordinates: "",
  desembarque: "",
  desembarque_coordinates: "",
  embarque_horario: "",
  desembarque_horario: "",
  valor_carona_por_pessoa: 0,
  status_carona: 0,
  nome_completo: "",
  is_active: false,
  is_owner: false,
};

const caronasDetailSlice = createSlice({
  name: "caronaDetail",
  initialState,
  reducers: {
    setCaronaDetail: (state, action: PayloadAction<ICaronaDetail>) => {
      return action.payload;
    },
  },
});

export const { setCaronaDetail } = caronasDetailSlice.actions;

export const getCaronaDetailSelector = (state: RootState) => state.caronaDetail;

export default caronasDetailSlice.reducer;
