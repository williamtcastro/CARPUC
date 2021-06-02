import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICarona } from "./caronas.slice";

const initialState: ICarona[] = [];

const caronasList = createSlice({
  name: "caronasList",
  initialState,
  reducers: {
    addCaronaList: (state, action: PayloadAction<ICarona>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);

      if (index === -1) state.push(action.payload);
      return state;
    },
  },
});

export const { addCaronaList } = caronasList.actions;

export const getCaronasListSelector = (state: RootState) => state.caronasList;

export default caronasList.reducer;
