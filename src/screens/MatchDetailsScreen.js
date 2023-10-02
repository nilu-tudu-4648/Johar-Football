import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import {
  AppButton,
  AppLoader,
  AppText,
  AppView,
  
} from "../components";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, WNFONTS, SIZES, FSTYLES } from "../constants/theme";
import * as Progress from "react-native-progress";
import ContestDetailsNavigator from "../navigation/ContestDetailsNavigator";
import { NAVIGATION } from "../constants/routes";
import ContestHeader from "../components/ContestHeader";
const MatchDetailsScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const joinContest = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      navigation.navigate(NAVIGATION.CREATE_TEAM);
      ToastAndroid.show("Joined Successfully", ToastAndroid.SHORT);
    }, 2000);
  };
  return (
    <View style={{ flex: 1 }}>
      <AppLoader loading={loading} />
      {/* header */}
      <ContestHeader title={"FCG vs PUN"} time={"7h 20 m left"} />
      {/* body */}
      <View style={{ padding: SIZES.base }}>
        <AppText style={{ fontWeight: "400" }} size={1.5}>
          Prize Pool
        </AppText>
        <AppText>₹5 lakhs</AppText>
        <Progress.Bar
          progress={0.3}
          width={SIZES.width * 0.93}
          color={COLORS.purple}
        />
        <View style={FSTYLES}>
          <AppText style={{ fontWeight: "400" }} size={1.5}>
            19,323 spots left
          </AppText>
          <AppText style={{ fontWeight: "400" }} size={1.5} color={COLORS.gray}>
            19,323 spots left
          </AppText>
        </View>
        <AppButton
          title={"JOIN ₹44"}
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
