import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import axios from "axios";
import { NAVIGATION } from "./routes";
import { setLoginUser } from "../store/userReducer";
import { ACTIONS } from "./data";

export const logoutUser = async (dispatch) => {
  try {
    dispatch(setLoginUser(null));
    await AsyncStorage.clear()
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
export const ensureMinimumLength = (inputString, minLength) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (inputString.length < minLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    inputString += randomChar;
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
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function showToast(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}
export const validatePAN = (Pan) => {
  const PAN_Card_No = Pan.toUpperCase();
  const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (PAN_Card_No.length == 10) {
    return regex.test(PAN_Card_No);
  }
};
