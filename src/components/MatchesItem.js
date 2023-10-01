import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppText } from "../components";
import { COLORS, FSTYLES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";

const MatchesItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(NAVIGATION.MATCH_DETAILS, { item })}
      style={styles.mainContainer}
    >
      <View
        style={{
          ...FSTYLES,
          backgroundColor: COLORS.lightyellow,
          padding: 4,
        }}
      >
        <AppText style={{ fontWeight: "400" }} size={1.5}>
          KBO
        </AppText>
        <AppText style={{ fontWeight: "400" }} size={1.5}>
          Lineups Out
        </AppText>
      </View>

      <View
        style={{
          ...FSTYLES,
          paddingHorizontal: 8,
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ backgroundColor: "red", height: 30, width: 30 }} />
            <AppText style={{ left: 6 }} size={1.5} bold={true}>
              KBO
            </AppText>
          </View>
          <AppText style={{ fontWeight: "400" }} size={1.5}>
            LG Twins
          </AppText>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AppText color={"red"}>1 hr</AppText>
          <AppText style={{ fontWeight: "400" }} size={1.5}>
            10:30 AM
          </AppText>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={{ right: 12 }} size={1.5} bold={true}>
              KBO
            </AppText>
            <View style={{ backgroundColor: "red", height: 30, width: 30 }} />
          </View>
          <AppText style={{ fontWeight: "400" }} size={1.5}>
            LG Twins
          </AppText>
        </View>
      </View>

      <View
        style={{
          ...FSTYLES,
          padding: 4,
          backgroundColor: COLORS.lightgray,
        }}
      >
        <AppText size={1.5}>KBO</AppText>
        <AppText size={1.5}>Lines Out</AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: 150,
    width: "99%",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: "space-between",
    alignSelf: "center",
    marginVertical: 8,
    elevation: 5,
  },
});
export default MatchesItem;
