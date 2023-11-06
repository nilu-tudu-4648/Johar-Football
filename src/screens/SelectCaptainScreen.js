import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContestHeader from "../components/ContestHeader";
import { AppButton, AppDivider, AppText, PriviewDialog } from "../components";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getLeaderBoard, showToast } from "../constants/functions";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
import { NAVIGATION } from "../constants/routes";
import { BackHandler } from "react-native";
import { setFilterPlayersForTournament } from "../store/playersReducer";

const SelectCaptainScreen = ({ navigation }) => {
  const [playersArray, setPlayersArray] = useState([]);
  const [visible, setvisible] = useState(false);
  const { players } = useSelector((state) => state.entities.playersReducer);
  const { user, selectedTournament } = useSelector(
    (state) => state.entities.userReducer
  );
  const dispatch = useDispatch();

  const updatedPlayersFunc = (item, type) => {
    const updatedPlayers = playersArray.map((player) => {
      let updatedPlayer = { ...player };

      if (player.name === item.name) {
        if (type === "C") {
          updatedPlayer.selectedCaptain = true;
          updatedPlayer.selectedViceCaptain = false;
          updatedPlayer.type = "Captain";
        } else if (type === "VC") {
          updatedPlayer.selectedCaptain = false;
          updatedPlayer.selectedViceCaptain = true;
          updatedPlayer.type = "ViceCaptain";
        }
      } else {
        if (player.type === "Captain" && type === "C") {
          updatedPlayer.selectedCaptain = false;
          updatedPlayer.type = "Player";
        } else if (player.type === "ViceCaptain" && type === "VC") {
          updatedPlayer.selectedViceCaptain = false;
          updatedPlayer.type = "Player";
        }
      }

      return updatedPlayer;
    });

    setPlayersArray(updatedPlayers);
  };

  useEffect(() => {
    setPlayersArray(players);
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
              {item.playerPic ? (
                <Image
                  source={{ uri: item.playerPic }}
                  style={{
                    width: SIZES.h1 * 1.5,
                    height: SIZES.h1 * 1.5,
                    borderRadius: SIZES.h1 * 1.5,
                  }}
                />
              ) : (
                <Entypo name="user" size={SIZES.h1 * 1.5} color="black" />
              )}
            </View>
            <View
              style={{
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <AppText size={1.3} bold={true}>
                {item.name}
              </AppText>
              <AppText size={1.2}>{item.points} pts</AppText>
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
                size={1.2}
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
                size={1.2}
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

  const saveTeamsToFirebase = async () => {
    try {
      const teamsCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.CREATED_TEAMS
      );
      await addDoc(teamsCollectionRef, {
        userName: user.firstName + " " + user.lastName,
        players: playersArray,
        matchId: selectedTournament.id,
      });
      await getLeaderBoard(dispatch, selectedTournament.id);
      showToast("Team Saved Successfully");
      navigation.navigate(NAVIGATION.HOME);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      dispatch(setFilterPlayersForTournament([]));
      navigation.navigate(NAVIGATION.HOME);
      return () => true;
    },
    []
  );
  return (
    <>
      <View style={{ flex: 1,backgroundColor: COLORS.white }}>
        <ContestHeader title={"Create Team"} />
        <View style={{ ...STYLES, marginVertical: SIZES.base }}>
          <AppText bold={true} size={1.8}>Choose your Captain and Vice Captain</AppText>
          <AppText size={1.5}>C gets 2X points, VC gets 1.5x points</AppText>
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
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
      <View style={{ ...FSTYLES, justifyContent: "space-around", bottom: 12 }}>
        <AppButton
          title="PREVIEW"
          onPress={() => setvisible(true)}
          style={{ borderRadius: 20, width: 150 }}
        />
        <AppButton
          title="SAVE"
          onPress={saveTeamsToFirebase}
          style={{
            borderRadius: 20,
            width: 150,
            backgroundColor: COLORS.green,
          }}
        />
      </View>
      <PriviewDialog
        visible={visible}
        players={players}
        setvisible={setvisible}
      />
    </>
  );
};

export default SelectCaptainScreen;

const styles = StyleSheet.create({
  chooseButton: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: SIZES.h2 / 2,
    width: SIZES.h2,
    height: SIZES.h2,
    justifyContent: "center",
    alignItems: "center",
  },
});
