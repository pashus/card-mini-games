import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  // isAuth: boolean;
  // user: { id: number; email: string };
}

const initialState: IAuthState = {
  // isAuth: some,
  // user: JSON.parse(localStorage.getItem("user")!),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction) {},
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
