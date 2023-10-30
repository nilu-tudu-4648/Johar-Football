import { StyleSheet, ToastAndroid, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AppButton, AppLoader, AppText } from "../components";
import { COLORS, SIZES } from "../constants/theme";
import ContestDetailsNavigator from "../navigation/ContestDetailsNavigator";
import { NAVIGATION } from "../constants/routes";
import ContestHeader from "../components/ContestHeader";
import { useDispatch } from "react-redux";
import { getLeaderBoard, getPlayersfromTeamName } from "../constants/functions";
const MatchDetailsScreen = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const item = route.params.item;
  const dispatch = useDispatch();
  const joinContest = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      navigation.navigate(NAVIGATION.CREATE_TEAM);
      ToastAndroid.show("Joined Successfully", ToastAndroid.SHORT);
    }, 2000);
  };
  useEffect(() => {
    getLeaderBoard(dispatch);
    getPlayersfromTeamName(item.firstTeamName, item.secondTeamName, dispatch);
  }, []);
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
        <AppButton
          title={`JOIN ₹${item.entryFees}`}
          onPress={joinContest}
          style={{ backgroundColor: COLORS.green }}
        />
      </View>
      {ContestDetailsNavigator()}
    </View>
  );
};

export default MatchDetailsScreen;

const styles = StyleSheet.create({});
