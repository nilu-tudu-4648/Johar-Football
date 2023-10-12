import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
const initialState = {
  loading: false,
  players: [],
};
const playersReducer = createSlice({
  name: "playersReducer",
  initialState,
  reducers: {
    playersReducerDataRequested: (playersReducer, action) => {
      playersReducer.loading = true;
    },
    playersReducerDataReceived: (playersReducer, action) => {
      playersReducer.loading = false;
      playersReducer.players = action.payload;
    },
    setPlayersForTournament: (playersReducer, action) => {
      if (playersReducer.players.length < 11) {
        playersReducer.players.push(action.payload);
      } else {
        alert("You can only select 11 players");
      }
    },
    setFilterPlayersForTournament: (playersReducer, action) => {
      playersReducer.players = action.payload;
    },
  },
});

export default playersReducer.reducer;
export const { setPlayersForTournament, setFilterPlayersForTournament } =
  playersReducer.actions;
