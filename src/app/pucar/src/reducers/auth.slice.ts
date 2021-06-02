import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAuth {
  token: string;
  id: number;
  cpf: string;
  nome_completo: string;
  email: string;
  celular: string;
  tier: number;
  genero: string;
  bio: any;
  authStatus: boolean;
}

const initialState: IAuth = {
  token: "",
  id: 0,
  cpf: "",
  nome_completo: "",
  email: "",
  celular: "",
  tier: 0,
  genero: "",
  bio: null,
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      return action.payload;
    },
    logOut: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;

export const getAuthSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
