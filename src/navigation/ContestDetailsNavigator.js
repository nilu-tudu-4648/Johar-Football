import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FSTYLES, SIZES } from "../constants/theme";
import { AppText } from "../components";
const Tab = createMaterialTopTabNavigator();

export default function ContestDetailsNavigator() {
  const HomeS = () => {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  };
  const SettingsScreen = () => {
    return (
      <View style={{ flex: 1, padding: SIZES.base }}>
        <AppText>All Teams (5)</AppText>
        <ScrollView>
          {[1, 1, 1, 1, 1].map((item, index) => (
            <View key={index} style={{ ...FSTYLES, padding: SIZES.base }}>
              <View style={{ width: "10%" }}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
              </View>
              <View style={{ width: "90%" }}>
                <Text>NameNameNameName</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Winnings" component={HomeS} />
      <Tab.Screen name="Leaderboard" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
