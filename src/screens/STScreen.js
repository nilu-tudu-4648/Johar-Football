import { ScrollView, StyleSheet, ToastAndroid } from "react-native";
import { PLAYERS } from "../constants/data";
import { useEffect, useState } from "react";
import CreateTeamItemComponent from "../components/CreateTeamItemComponent";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setFilterPlayersForTournament,
  setPlayersForTournament,
} from "../store/playersReducer";
import { Button } from "react-native";
import { NAVIGATION } from "../constants/routes";

const STScreen = ({ navigation }) => {
  const [playersArray, setplayersArray] = useState([]);
  const { players, createPlayers } = useSelector(
    (state) => state.entities.playersReducer
  );
  const dispatch = useDispatch();
  const addSTtoStorage = async () => {
    try {
      const updatedPlayersArray = createPlayers.filter(
        (player) => player.playerType === "ST"
      );
      setplayersArray(updatedPlayersArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addPlayerstoTeamFunc = async (item) => {
    try {
      const playerExists = playersArray.find(
        (ite) => ite.name === item.name && ite.isActive
      );
      const updatedPlayers = playersArray.map((player) =>
        player.name === item.name
          ? { ...player, isActive: !player.isActive }
          : player
      );
      const deselectedPlayer = players.filter((ite) => ite.name !== item.name);
      if (deselectedPlayer) {
        dispatch(setFilterPlayersForTournament(deselectedPlayer));
      }
      setplayersArray(updatedPlayers);
      if (!playerExists) {
        dispatch(setPlayersForTournament(item));
        console.log("Player does not exist in the team");
      } else {
        console.log("Player already exists in the team");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    addSTtoStorage();
  }, []);
  const NextButton = () => {
    if (players.length === 11) {
      navigation.navigate(NAVIGATION.SELECT_CAPTAIN);
    } else {
      ToastAndroid.show("Please select 11 players", ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <ScrollView>
        {playersArray.map((item, index) => (
          <CreateTeamItemComponent
            key={index}
            item={item}
            addPlayerstoTeamFunc={addPlayerstoTeamFunc}
          />
        ))}
      </ScrollView>
      <Button title="Next" onPress={NextButton} />
    </>
  );
};

export default STScreen;

const styles = StyleSheet.create({});
