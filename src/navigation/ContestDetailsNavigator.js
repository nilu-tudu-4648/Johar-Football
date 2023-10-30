import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FSTYLES, SIZES } from "../constants/theme";
import { AppText } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { NAVIGATION } from "../constants/routes";
const Tab = createMaterialTopTabNavigator();

export default function ContestDetailsNavigator() {
  const Winnings = ({ navigation }) => {
    const { leaderBoard, createPlayers } = useSelector(
      (state) => state.entities.playersReducer
    );
    const [leaderBoardArray, setleaderBoardArray] = useState([]);
    const pointsValue = {
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
              if (player) {
                // Check if player is defined before accessing 'points'
                player.points = (pointsValue[item?.type] || 0) * player.points;
                return player?.points;
              }
              return 0; // or any default value if player is not found
            })
            .reduce((accumulator, currentValue) => {
              return parseInt(accumulator) + parseInt(currentValue);
            }, 0);

          return {
            id: team.id,
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
      <SafeAreaView style={{ flex: 1, padding: SIZES.base }}>
        <View style={FSTYLES}>
          <View style={{ ...FSTYLES, width: "35%" }}>
            <AppText size={1.5}>Names</AppText>
          </View>
          <AppText size={1.5}>Points</AppText>
          <AppText size={1.5}>Ranking</AppText>
        </View>
        <ScrollView>
          {leaderBoardArray.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                const selectedTeam = leaderBoard.find(
                  (team) => team.id === item.id
                );
                navigation.navigate(NAVIGATION.WINNING_POINTS, {
                  selectedTeam,
                });
              }}
              key={index}
              style={{ ...FSTYLES, padding: SIZES.base }}
            >
              <View style={{ ...FSTYLES, width: "30%" }}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
                <AppText style={{ left: 12 }} size={1.3}>
                  {item.userName}
                </AppText>
              </View>
              <View>
                <AppText size={1.3}>{item.score}</AppText>
              </View>
              <View>
                <AppText size={1.3}>{index + 1}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  const LeaderboardScreen = () => {
    const { leaderBoard, createPlayers } = useSelector(
      (state) => state.entities.playersReducer
    );
    const [leaderBoardArray, setleaderBoardArray] = useState([]);
    const pointsValue = {
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
              if (player) {
                // Check if player is defined before accessing 'points'
                player.points = (pointsValue[item?.type] || 0) * player.points;
                return player?.points;
              }
              return 0; // or any default value if player is not found
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
        <AppText size={1.5}>All Teams ({leaderBoard.length})</AppText>
        <ScrollView>
          {leaderBoardArray.map((item, index) => (
            <View key={index} style={{ ...FSTYLES, padding: SIZES.base }}>
              <View style={{ ...FSTYLES, width: "30%" }}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
                <AppText style={{ left: 12 }} size={1.3}>
                  {item.userName}
                </AppText>
              </View>
              <View>
                <AppText size={1.3}>{item.score}</AppText>
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
