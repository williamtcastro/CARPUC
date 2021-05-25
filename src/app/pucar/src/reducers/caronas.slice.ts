import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICarona {
  id: number;
  veiculo: string;
  condutor: string;
  embarque: string;
  embarque_horario: string;
  embarque_coordinates: string;
  desembarque: string;
  desembarque_horario: string;
  desembarque_coordinates: string;
  status_carona: number;
  valor_carona_por_pessoa: number;
  nome_completo: string;
}

const initialState: ICarona[] = [];

const caronasSlice = createSlice({
  name: "caronas",
  initialState,
  reducers: {
    addCarona: (state, action: PayloadAction<ICarona>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);

      if (index === -1) state.push(action.payload);
      return state;
    },
  },
});

export const { addCarona } = caronasSlice.actions;

export const getCaronasSelector = (state: RootState) => state.caronas;

export default caronasSlice.reducer;
