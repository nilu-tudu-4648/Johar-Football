import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import { AppText, AppView } from "../components";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import ContestHeader from "../components/ContestHeader";
import { truncateString } from "../constants/functions";
const WinningPointsScreen = ({ route }) => {
  const { selectedTeam, playersArray } = route.params;
  const renderPlayers = (playerType, header) => {
    return (
      <>
        <AppText bold={true} color={COLORS.white} size={1.5}>
          {header.toUpperCase()}
        </AppText>
        <View style={styles.optionsContainer}>
          {playersArray
            .filter((player) => player.playerType === playerType)
            .map((item) => (
              <View key={item.name} style={{ alignItems: "center", width: 60 }}>
                <AppText size={1.5} color={COLORS.white}>
                  {item.type === "Captain"
                    ? "C"
                    : item.type === "ViceCaptain" && "VC"}
                </AppText>
                <Entypo
                  name="user"
                  size={SIZES.h1 * 1.1}
                  color={COLORS.black}
                />
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: SIZES.base / 10,
                  }}
                >
                  <AppText size={1}>{truncateString(item.name, 6)}</AppText>
                </View>
                <AppText color={COLORS.white} size={1.2} bold={true}>
                  {item.points}
                </AppText>
              </View>
            ))}
        </View>
      </>
    );
  };
  return (
    <>
      <ContestHeader />
      <AppView>
        <AppText bold={true} style={{ alignSelf: "center" }} size={2}>
          {selectedTeam.userName}
        </AppText>
        <ImageBackground
          style={styles.viewContainer}
          source={require("../../assets/ground.jpg")}
        >
          {renderPlayers("GK", "Goal Keeper")}
          {renderPlayers("DEF", "Defenders")}
          {renderPlayers("MID", "Midfielders")}
          {renderPlayers("ST", "Strikers")}
        </ImageBackground>
      </AppView>
    </>
  );
};

export default WinningPointsScreen;

const styles = StyleSheet.create({
  optionsContainer: {
    marginVertical: SIZES.h7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },

  viewContainer: {
    ...STYLES,
    height: "100%",
    justifyContent: "space-around",
  },
});
