import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { PLAYERS } from "../constants/data";
const initialState = {
  loading: false,
  user: null,
  userLoggedIn: "false",
  createteam: [],
  GK: PLAYERS,
  DEF: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userReducerDataRequested: (userReducer, action) => {
      userReducer.loading = true;
    },
    userReducerDataReceived: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.user = action.payload;
    },
    userReducerDataRequestFailed: (userReducer, action) => {
      userReducer.loading = false;
    },
    checkUserLogin: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.userLoggedIn = action.payload;
    },
    setLoginUser: (userReducer, action) => {
      userReducer.user = action.payload;
    },
    logoutFromReducer: (userReducer, action) => {
      userReducer.otpData = null;
    },
    addGKtoTeam: (userReducer, action) => {
      userReducer.GK = action.payload;
    },
    addDEFtoTeam: (userReducer, action) => {
      userReducer.DEF = action.payload;
    },
    addPlayerstoTeam: (userReducer, action) => {
      userReducer.createteam = action.payload;
    },
  },
});

const {
  userReducerDataReceived,
  userReducerDataRequestFailed,
  userReducerDataRequested,
} = userReducer.actions;

export default userReducer.reducer;
export const {
  logoutFromReducer,
  setLoginUser,
  checkUserLogin,
  addPlayerstoTeam,
  addGKtoTeam,
  addDEFtoTeam,
} = userReducer.actions;
export const getUserDetails = (data) =>
  apiCallBegan({
    method: "post",
    data,
    onStart: userReducerDataRequested.type,
    onSuccess: userReducerDataReceived.type,
    onError: userReducerDataRequestFailed.type,
  });
