import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, fetchProducts } from "./welcomeApi";

export interface WelcomeState {
  value: string;
  status: "idle" | "loading" | "failed";
}

const initialState: WelcomeState = {
  value: "",
  status: "idle",
};

export const setLogin = createAsyncThunk("counter/set_login", async () => {
  const response = await login();
  console.log("LOGIN", response);
});

export const getProducts = createAsyncThunk(
  "counter/get_products",
  async () => {
    const response = await fetchProducts();
    console.log("PROD", response);
  }
);

export const welcomeSlice = createSlice({
  name: "welcome",
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

export const selectWelcome = () => "Don calcetón";

export default welcomeSlice.reducer;
