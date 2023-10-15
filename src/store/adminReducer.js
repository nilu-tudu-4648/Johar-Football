import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { PLAYERS } from "../constants/data";
const initialState = {
  loading: false,
  allusers: [],
  allPlayers: [],
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setAllUsers: (adminReducer, action) => {
      adminReducer.allusers = action.payload;
    },
    setAllPlayers: (adminReducer, action) => {
      adminReducer.allPlayers = action.payload;
    },
  },
});

export default adminReducer.reducer;
export const { setAllUsers, setAllPlayers } = adminReducer.actions;
