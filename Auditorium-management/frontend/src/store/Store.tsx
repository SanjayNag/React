import { configureStore } from "@reduxjs/toolkit";
import DataSliceReducer from "./DataSlice";
export const Store = configureStore({
  reducer: {
    stadiumList: DataSliceReducer.reducer,
    dateTimeData: DataSliceReducer.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export default Store;
