import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICarona } from "./caronas.slice";

const initialState: ICarona = {
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
};

const caronaActiveSlice = createSlice({
  name: "caronaActive",
  initialState,
  reducers: {
    setCaronaActive: (state, action: PayloadAction<ICarona>) => {
      return action.payload;
    },
  },
});

export const { setCaronaActive } = caronaActiveSlice.actions;

export const getCaronaActiveSelector = (state: RootState) => state.caronaActive;

export default caronaActiveSlice.reducer;
