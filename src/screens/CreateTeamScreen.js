import { StyleSheet, View } from "react-native";
import React from "react";
import { AppText } from "../components";
import CreateTeamNavigator from "../navigation/CreateTeamNavigator";
import ContestHeader from "../components/ContestHeader";

const CreateTeamScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ContestHeader time={"7h 20 m left"} title={"Create Team"} />
      {/* body */}
      <AppText>Maximum of 7 players from one team</AppText>
      {CreateTeamNavigator()}
    </View>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({});
