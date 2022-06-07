import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type Stadium = {
  stadiumData: any[];
  dateTimeData: any[];
};

const intialStadiumState = {
  stadiumData: [],
  dateTimeData: [],
} as Stadium;

const DataSlice = createSlice({
  name: "stadiumList",
  initialState: intialStadiumState,
  reducers: {
    setStadiumDetails(state, action: PayloadAction<Stadium>) {
      state.stadiumData.length === 0 &&
        state.stadiumData.indexOf(action.payload) === -1 &&
        state.stadiumData.push(action.payload);
    },
    getStadiumDetails(state, action: PayloadAction<Stadium>) {
      state.stadiumData.map((values) => values);
    },
    setDateTimeFilteredData(state, action: PayloadAction<Stadium>) {
      state.dateTimeData.splice(0, state.dateTimeData.length);
      state.dateTimeData.push(action.payload);
    },
  },
});

export const { setStadiumDetails, getStadiumDetails, setDateTimeFilteredData } =
  DataSlice.actions;

export default DataSlice;

export const selectedData = (state: RootState) => state.stadiumList;
export const filterData = (state: RootState) => state.dateTimeData;
