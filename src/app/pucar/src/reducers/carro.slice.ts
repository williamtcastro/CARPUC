import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICarro {
  id: number;
  placa: string;
  marca_modelo: string;
  ano: number;
  cor: string;
  condutor: string;
  assentos_disponiveis: number;
  created_at: string;
  updated_at: string;
}

const initialState: ICarro[] = [];

const carrosListSlice = createSlice({
  name: "carrosList",
  initialState,
  reducers: {
    addCarro: (state, action: PayloadAction<ICarro>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);

      if (index === -1) state.push(action.payload);
      return state;
    },
  },
});

export const { addCarro } = carrosListSlice.actions;

export const getCarrosSelector = (state: RootState) => state.carrosList;

export default carrosListSlice.reducer;
