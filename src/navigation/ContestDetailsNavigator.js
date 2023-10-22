import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FSTYLES, SIZES } from "../constants/theme";
import { AppText } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Tab = createMaterialTopTabNavigator();

export default function ContestDetailsNavigator() {
  const Winnings = () => {
    const { leaderBoard, createPlayers } = useSelector(
      (state) => state.entities.playersReducer
    );
    const [leaderBoardArray, setleaderBoardArray] = useState([]);
    const points = {
      Captain: 2,
      ViceCaptain: 1.5,
      Player: 1,
    };

    useEffect(() => {
      if (createPlayers) {
        const tempLeaderBoard = leaderBoard?.map((team) => {
          const tempScores = team.players
            .map((item) => {
              const player = createPlayers.find((p) => p.id === item.id);
              player.points = points[item?.type] * player.points;
              return player.points;
            })
            .reduce((accumulator, currentValue) => {
              return parseInt(accumulator) + parseInt(currentValue);
            }, 0);
          return {
            userName: team.userName,
            score: tempScores,
          };
        });
        tempLeaderBoard.sort((a, b) => b.score - a.score);
        setleaderBoardArray(tempLeaderBoard);
      } else {
        setleaderBoardArray([]);
      }
    }, [createPlayers]);
    return (
      <View style={{ flex: 1, padding: SIZES.base }}>
        <AppText>All Teams ({leaderBoard.length})</AppText>
        <ScrollView>
          {leaderBoardArray.map((item, index) => (
            <View key={index} style={{ ...FSTYLES, padding: SIZES.base }}>
              <View style={{ ...FSTYLES, width: "30%" }}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
                <AppText style={{ left: 12 }}>{item.userName}</AppText>
              </View>
              <View>
                <AppText>{index + 1}</AppText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  const LeaderboardScreen = () => {
    const { leaderBoard, createPlayers } = useSelector(
      (state) => state.entities.playersReducer
    );
    const [leaderBoardArray, setleaderBoardArray] = useState([]);
    const points = {
      Captain: 2,
      ViceCaptain: 1.5,
      Player: 1,
    };

    useEffect(() => {
      if (createPlayers) {
        const tempLeaderBoard = leaderBoard?.map((team) => {
          const tempScores = team.players
            .map((item) => {
              const player = createPlayers.find((p) => p.id === item.id);
              player.points = points[item?.type] * player.points;
              return player.points;
            })
            .reduce((accumulator, currentValue) => {
              return parseInt(accumulator) + parseInt(currentValue);
            }, 0);
          return {
            userName: team.userName,
            score: tempScores,
          };
        });

        setleaderBoardArray(tempLeaderBoard);
      } else {
        setleaderBoardArray([]);
      }
    }, [createPlayers]);
    return (
      <View style={{ flex: 1, padding: SIZES.base }}>
        <AppText>All Teams ({leaderBoard.length})</AppText>
        <ScrollView>
          {leaderBoardArray.map((item, index) => (
            <View key={index} style={{ ...FSTYLES, padding: SIZES.base }}>
              <View style={{ ...FSTYLES, width: "30%" }}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
                <AppText style={{ left: 12 }}>{item.userName}</AppText>
              </View>
              <View>
                <AppText>{item.score}</AppText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Winnings" component={Winnings} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}
