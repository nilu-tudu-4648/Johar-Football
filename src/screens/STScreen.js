import { ScrollView, StyleSheet } from "react-native";
import { PLAYERS } from "../constants/data";
import { useEffect, useState } from "react";
import CreateTeamItemComponent from "../components/CreateTeamItemComponent";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFilterPlayersForTournament, setPlayersForTournament } from "../store/playersReducer";
import { Button } from "react-native";
import { logoutUser } from "../constants/functions";

const STScreen = () => {
  const [playersArray, setplayersArray] = useState([]);
  const { players } = useSelector((state) => state.entities.playersReducer);
  const dispatch = useDispatch();
  const addSTtoStorage = async () => {
    try {
      const ST = await AsyncStorage.getItem("ST");
      const parsedST = ST ? JSON.parse(ST) : null;
      const updatedPlayersArray =
        parsedST || PLAYERS.filter((player) => player.isST);
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
        <Button title="Submit" onPress={() => logoutUser()} />
      </ScrollView>
    </>
  );
};

export default STScreen;

const styles = StyleSheet.create({});
