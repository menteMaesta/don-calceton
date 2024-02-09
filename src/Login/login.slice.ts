import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, fetchProducts } from "./loginApi";

export interface LoginState {
  value: string;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginState = {
  value: "",
  status: "idle",
};

export const setLogin = createAsyncThunk("counter/set_login", async () => {
  const { value } = await login();
  localStorage.setItem("accessToken", `Bearer ${value}`);
});

export const getProducts = createAsyncThunk(
  "counter/get_products",
  async () => {
    const response = await fetchProducts();
    console.log("PROD", response);
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLogin.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(setLogin.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default loginSlice.reducer;
