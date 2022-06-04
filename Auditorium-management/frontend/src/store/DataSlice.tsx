import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type Stadium = {
  stadiumData: any[];
};

const intialStadiumState = {
  stadiumData: [],
} as Stadium;

const DataSlice = createSlice({
  name: "stadiumList",
  initialState: intialStadiumState,
  reducers: {
    setStadiumDetails(state, action: PayloadAction<Stadium>) {
      state.stadiumData.push(action.payload);
      //console.log(state.stadiumList.values);
    },
    getStadiumDetails(state, action: PayloadAction<Stadium>) {
      state.stadiumData.map((values) => values);
    },
  },
});

export const { setStadiumDetails, getStadiumDetails } = DataSlice.actions;

export default DataSlice;

export const selectedData = (state: RootState) => state.stadiumList;
