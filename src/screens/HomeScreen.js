import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppButton, AppView, HomeHeader } from "../components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../constants/functions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <>
      <HomeHeader header={"DASHBOARD"} />
      <AppView>
        <Text>HomeScreen</Text>
        <AppButton title={"Logout"} onPress={() => logoutUser(dispatch)} />
      </AppView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
