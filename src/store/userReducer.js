import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
const initialState = {
  loading: false,
  user: null,
  userLoggedIn: "false",
  createteam: [],
  tournaments: [],
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
    addPlayerstoTeam: (userReducer, action) => {
      userReducer.createteam = action.payload;
    },
    settournaments: (userReducer, action) => {
      userReducer.tournaments = action.payload;
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
  settournaments
} = userReducer.actions;
export const getUserDetails = (data) =>
  apiCallBegan({
    method: "post",
    data,
    onStart: userReducerDataRequested.type,
    onSuccess: userReducerDataReceived.type,
    onError: userReducerDataRequestFailed.type,
  });
