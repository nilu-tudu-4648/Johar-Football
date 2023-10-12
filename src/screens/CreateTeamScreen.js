import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { AppText } from "../components";
import CreateTeamNavigator from "../navigation/CreateTeamNavigator";
import ContestHeader from "../components/ContestHeader";
import { useSelector } from "react-redux";

const CreateTeamScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ContestHeader time={"7h 20 m left"} title={"Create Team"} />
      <AppText>Players 0/11</AppText>
      {/* body */}
      <AppText>Maximum of 7 players from one team</AppText>
      {/* {CreateTeamNavigator(selectedPlayers)} */}
      <CreateTeamNavigator />
    </View>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({});
