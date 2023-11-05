import { StyleSheet, View, ImageBackground, Image } from "react-native";
import React from "react";
import { SIZES, STYLES } from "../constants/theme";
import { Dialog } from "react-native-paper";
import AppText from "./AppText";
import { Entypo } from "@expo/vector-icons";
const PriviewDialog = ({ visible, setvisible, players }) => {
  const renderPlayers = (playerType, header) => {
    return (
      <>
        <AppText bold={true}>{header}</AppText>
        <View style={styles.optionsContainer}>
          {players
            .filter((player) => player.playerType === playerType)
            .map((item) => (
              <View key={item.id} style={{ alignItems: "center" }}>
                {item.playerPic ? (
                  <Image
                    source={{ uri: item.playerPic }}
                    style={{
                      width: SIZES.h1 * 1.3,
                      height: SIZES.h1 * 1.3,
                      borderRadius: SIZES.h1 * 1.3,
                    }}
                  />
                ) : (
                  <Entypo name="user" size={SIZES.h1 * 1.3} color="black" />
                )}
                <AppText size={1}>{item.name}</AppText>
              </View>
            ))}
        </View>
      </>
    );
  };
  return (
    <Dialog
      visible={visible}
      onDismiss={() => setvisible(false)}
      style={styles.modalContainer}
    >
      <ImageBackground
        style={styles.viewContainer}
        source={require("../../assets/ground.jpg")}
      >
        {renderPlayers("GK", "Goal Keeper")}
        {renderPlayers("DEF", "Defenders")}
        {renderPlayers("MID", "Midfielders")}
        {renderPlayers("ST", "Strikers")}
      </ImageBackground>
    </Dialog>
  );
};

export default PriviewDialog;

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
    height: "95%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 0,
    alignSelf: "center",
  },
  viewContainer: {
    ...STYLES,
    height: "100%",
    justifyContent: "space-around",
  },
});
