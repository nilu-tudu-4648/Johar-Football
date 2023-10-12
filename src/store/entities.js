import { combineReducers } from "redux";
import userReducer from "./userReducer";
import playersReducer from "./playersReducer";

export default combineReducers({
    userReducer,
    playersReducer
});
