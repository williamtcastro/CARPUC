import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IActionIndex {
  index: number;
}

const initialState: IActionIndex = {
  index: 0,
};

const actionIndex = createSlice({
  name: "actionIndex",
  initialState,
  reducers: {
    setActionIndex: (state, action: PayloadAction<IActionIndex>) => {
      return action.payload;
    },
  },
});

export const { setActionIndex } = actionIndex.actions;

export const getActionIndex = (state: RootState) => state.actionIndex;

export default actionIndex.reducer;
