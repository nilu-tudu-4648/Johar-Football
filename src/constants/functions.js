import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import axios from "axios";
import { setLoginUser, settournaments } from "../store/userReducer";
import { FIRESTORE_COLLECTIONS } from "./data";
import { setcreatePlayers, setleaderBoard } from "../store/playersReducer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { setAllPlayers, setAllUsers } from "../store/adminReducer";

export const logoutUser = async (dispatch) => {
  try {
    dispatch(setLoginUser(null));
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const containsSpecialCharacters = (str) => {
  const regex = /[!₹@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  return regex.test(str);
};
export const isValidPhoneNumber = (str) => {
  const regex = /^[6-9][0-9]{9}$/;
  return regex.test(str);
};
export const truncateString = (inputString, maxLength) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "...";
  }
  return inputString;
};
export function checkIfMultipleTypes(arr) {
  const uniqueItems = new Set(arr);
  return uniqueItems.size > 1;
}
export const formatDate = (timestamp) => {
  const truncatedTimestamp = Math.floor(timestamp / 1000); // Remove milliseconds

  const date = new Date(truncatedTimestamp * 1000); // Convert to milliseconds

  // Extract the day, month, and year components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month since it is zero-based
  const year = date.getFullYear().toString(); // Get the last two digits of the year

  // Return the formatted date with AM/PM indicator in ddmmyy format
  return `${day}/${month}/${year}`;
};
export const formatTimestamp = (timestamp) => {
  const truncatedTimestamp = Math.floor(timestamp / 1000); // Remove milliseconds

  const date = new Date(truncatedTimestamp * 1000); // Convert to milliseconds

  // Extract the hours, minutes, and AM/PM indicator
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Return the formatted date with AM/PM indicator in ddmmyy format
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
export const secformatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Return the formatted date in yyyy-MM-dd hh:mm tt format
  return `${year}-${month}-${day} ${hours12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
};

export const sanitizeJsonString = (jsonString) => {
  // Remove any characters that are not part of a valid JSON format
  const sanitizedString = jsonString.replace(/[^\x20-\x7E]/g, "");

  return sanitizedString;
};

export function showToast(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}
export const getTournaments = async (dispatch) => {
  try {
    const q = query(collection(db, FIRESTORE_COLLECTIONS.TOURNAMENTS));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      return arr.push({ id, ...data });
    });
    dispatch(settournaments(arr));
  } catch (error) {
    console.log(error);
  }
};
export const getLeaderBoard = async (dispatch) => {
  try {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.CREATED_TEAMS),
      where("matchId", "==", "123")
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      return arr.push({ id, ...data });
    });
    dispatch(setleaderBoard(arr));
  } catch (error) {
    console.log(error);
  }
};
export const getPlayersfromTeamName = async (firstTeamName, secondTeamName, dispatch) => {
  try {
    const arr = [];
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.PLAYERS),
      where("teamName", "==", firstTeamName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      arr.push({ id, ...data });
    });

    const qr = query(
      collection(db, FIRESTORE_COLLECTIONS.PLAYERS),
      where("teamName", "==", secondTeamName)
    );
    const querySnapshot2 = await getDocs(qr);
    querySnapshot2.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      arr.push({ id, ...data });
    });
    dispatch(setcreatePlayers(arr));
  } catch (error) {
    console.log(error);
  }
};


//admin apis
export const getAllUsers = async (dispatch, func) => {
  try {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.USERS),
      where("admin", "==", "false")
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      return arr.push({ id, ...data });
    });
    dispatch(setAllUsers(arr));
    func(false);
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id, func) => {
  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.PLAYERS, id));
    func();
  } catch (error) {
    console.log(error);
  }
};
export const getAllPlayers = async (dispatch, func) => {
  try {
    const q = query(collection(db, FIRESTORE_COLLECTIONS.PLAYERS));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      return arr.push({ id, ...data });
    });
    dispatch(setAllPlayers(arr));
    func(false);
  } catch (error) {
    console.log(error);
  }
};
