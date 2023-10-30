import { StyleSheet, View } from "react-native";
import React from "react";
import { AppText, AppView } from "../components";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import ContestHeader from "../components/ContestHeader";
const WinningPointsScreen = ({ route }) => {
  const selectedTeam = route.params.selectedTeam;
  const renderPlayers = (playerType, header) => {
    return (
      <>
        <AppText bold={true} size={1.5}>
          {header}
        </AppText>
        <View style={styles.optionsContainer}>
          {selectedTeam.players
            .filter((player) => player.playerType === playerType)
            .map((item) => (
              <View key={item.id} style={{ alignItems: "center" }}>
                <Entypo name="user" size={SIZES.h1 * 1.3} color="black" />
                <AppText size={1}>{item.name}</AppText>
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
          {selectedTeam.user}
        </AppText>
        <View style={styles.viewContainer}>
          {renderPlayers("GK", "Goal Keeper")}
          {renderPlayers("DEF", "Defenders")}
          {renderPlayers("MID", "Midfielders")}
          {renderPlayers("ST", "Strikers")}
        </View>
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
  modalContainer: {
    width: "90%",
    height: "85%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    paddingTop: 0,
    backgroundColor: COLORS.green,
    alignSelf: "center",
  },
  viewContainer: {
    ...STYLES,
    height: "100%",
    justifyContent: "space-around",
  },
});
