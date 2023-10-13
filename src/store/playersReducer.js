import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  players: [],
  leaderBoard: [],
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
    setleaderBoard: (playersReducer, action) => {
      playersReducer.leaderBoard = action.payload;
    },
  },
});

export default playersReducer.reducer;
export const {
  setPlayersForTournament,
  setFilterPlayersForTournament,
  setleaderBoard,
} = playersReducer.actions;
