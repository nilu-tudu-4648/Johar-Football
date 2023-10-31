import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AppButton, AppLoader, AppText } from "../components";
import { COLORS, SIZES } from "../constants/theme";
import ContestDetailsNavigator from "../navigation/ContestDetailsNavigator";
import { NAVIGATION } from "../constants/routes";
import ContestHeader from "../components/ContestHeader";
import { useDispatch } from "react-redux";
import {
  getLeaderBoard,
  getPlayersfromTeamName,
  showToast,
} from "../constants/functions";
import { BackHandler } from "react-native";
const MatchDetailsScreen = ({ navigation, route }) => {
  const [loading, setloading] = useState(true);
  const { item, completed } = route.params;
  const dispatch = useDispatch();
  const joinContest = () => {
    navigation.navigate(NAVIGATION.CREATE_TEAM);
    showToast("Joined Successfully");
  };
  useEffect(() => {
    getLeaderBoard(dispatch, item.id, setloading);
    getPlayersfromTeamName(item.firstTeamName, item.secondTeamName, dispatch);
  }, []);
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.HOME);
      return () => true;
    },
    []
  );
  return (
    <View style={{ flex: 1 }}>
      <AppLoader loading={loading} />
      {/* header */}
      <ContestHeader />
      {/* body */}
      <View style={{ padding: SIZES.base }}>
        <AppText style={{ fontWeight: "400" }} size={1.5}>
          Prize Pool
        </AppText>
        <AppText>₹{item?.prizeAmount}</AppText>
        {completed ? (
          <AppText>Match Completed</AppText>
        ) : (
          <AppButton
            title={`JOIN ₹${item.entryFees}`}
            onPress={joinContest}
            style={{ backgroundColor: COLORS.green }}
          />
        )}
      </View>
      {ContestDetailsNavigator()}
    </View>
  );
};

export default MatchDetailsScreen;

const styles = StyleSheet.create({});
