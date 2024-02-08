import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import welcome from "../welcome/welcome.slice";

export const store = configureStore({
  reducer: {
    welcome,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
