import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContestHeader from "../components/ContestHeader";
import { AppDivider, AppText } from "../components";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { NAVIGATION } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getLeaderBoard, showToast } from "../constants/functions";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
const SelectCaptainScreen = ({ navigation }) => {
  const [playersArray, setplayersArray] = useState([]);
  const { players } = useSelector((state) => state.entities.playersReducer);
  const { user, selectedTournament } = useSelector(
    (state) => state.entities.userReducer
  );
  const dispatch = useDispatch();
  const updatedPlayersFunc = (item, type) => {
    const updatedPlayers = playersArray.map((player) => {
      const updatedPlayer = { ...player, type: "Player" };
      if (player.name === item.name) {
        if (type === "C") {
          const otherCaptain = playersArray.find(
            (p) => p.selectedCaptain && p.name !== item.name
          );
          if (otherCaptain) {
            otherCaptain.selectedCaptain = false;
            otherCaptain.type = "Player";
          }
          updatedPlayer.selectedCaptain = !player.selectedCaptain;
          updatedPlayer.type = "Captain";
        } else if (type === "VC") {
          const otherViceCaptain = playersArray.find(
            (p) => p.selectedViceCaptain && p.name !== item.name
          );
          if (otherViceCaptain) {
            otherViceCaptain.selectedViceCaptain = false;
            otherViceCaptain.type = "Player";
          }
          updatedPlayer.selectedCaptain = false;
          updatedPlayer.selectedViceCaptain = !player.selectedViceCaptain;
          updatedPlayer.type = "ViceCaptain";
        }
      }

      return updatedPlayer;
    });

    setplayersArray(updatedPlayers);
  };
  useEffect(() => {
    setplayersArray(players);
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            ...FSTYLES,
            padding: SIZES.base1,
            marginVertical: SIZES.base1,
          }}
        >
          <View style={{ ...FSTYLES, width: "40%" }}>
            <View
              style={{
                alignItems: "center",
                width: "30%",
              }}
            >
              <Entypo name="user" size={SIZES.h1 * 1.5} color="black" />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <AppText size={1.4} bold={true}>
                {item.name}
              </AppText>
              <AppText size={1.3}>012 pts</AppText>
            </View>
          </View>
          <View
            style={{ ...FSTYLES, width: "36%", paddingHorizontal: SIZES.base1 }}
          >
            <TouchableOpacity
              onPress={() => updatedPlayersFunc(item, "C")}
              style={{
                ...styles.chooseButton,
                backgroundColor: item.selectedCaptain
                  ? COLORS.black
                  : COLORS.white,
              }}
            >
              <AppText
                size={1.35}
                bold={true}
                color={!item.selectedCaptain ? COLORS.black : COLORS.white}
              >
                {item.selectedCaptain ? "2X" : "C"}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updatedPlayersFunc(item, "VC")}
              style={{
                ...styles.chooseButton,
                backgroundColor: item.selectedViceCaptain
                  ? COLORS.black
                  : COLORS.white,
              }}
            >
              <AppText
                size={1.35}
                bold={true}
                color={!item.selectedViceCaptain ? COLORS.black : COLORS.white}
              >
                {item.selectedViceCaptain ? "1.5X" : "VC"}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <AppDivider />
      </View>
    );
  };
  const saveTeamstoFirebase = async () => {
    try {
      const teamsCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.CREATED_TEAMS
      );
      await addDoc(teamsCollectionRef, {
        user: user.firstName + " " + user.lastName,
        userName: user.firstName + " " + user.lastName,
        players: playersArray.map((player) => ({
          id: player.id,
          name: player.name,
          type: player.type,
          playerType: player.playerType,
        })),
        matchId: selectedTournament.id,
      });
      await getLeaderBoard(dispatch, selectedTournament.id);
      showToast("Team Saved Successfully");
      navigation.navigate(NAVIGATION.HOME);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <ContestHeader title={"Create Team"} />
        <View style={{ ...STYLES, marginVertical: SIZES.base }}>
          <AppText bold={true}>Choose your Captain and Vice Captain</AppText>
          <AppText size={1.5}>C gets 2X poinst,VC gets 1.5x points</AppText>
        </View>
        <AppDivider />
        <View style={{ ...FSTYLES, marginVertical: SIZES.base }}>
          <View
            style={{ ...FSTYLES, width: "40%", paddingHorizontal: SIZES.base }}
          >
            <AppText size={1.4}>PLAYER</AppText>
            <AppText size={1.4}>POINTS</AppText>
          </View>
          <View
            style={{ ...FSTYLES, width: "40%", paddingHorizontal: SIZES.base }}
          >
            <AppText size={1.4}>% C BY</AppText>
            <AppText size={1.4}>% VC BY</AppText>
          </View>
        </View>
        <AppDivider />
        <FlatList
          data={playersArray}
          renderItem={renderItem}
          keyExtractor={(i, index) => index.toString()}
        />
      </View>
      <Button
        title="Save & Continue"
        style={{ bottom: 12 }}
        onPress={saveTeamstoFirebase}
      />
    </>
  );
};

export default SelectCaptainScreen;

const styles = StyleSheet.create({
  chooseButton: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: SIZES.h1 / 2,
    width: SIZES.h1,
    height: SIZES.h1,
    justifyContent: "center",
    alignItems: "center",
  },
});
