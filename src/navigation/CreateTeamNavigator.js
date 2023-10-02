import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, Text, View } from "react-native";
import TeamItemComponent from "../components/TeamItemComponent";
const Tab = createMaterialTopTabNavigator();

export default function CreateTeamNavigator() {
  const GK = () => {
    return (
      <View>
        <Text>GK</Text>
        <ScrollView>
          {[1, 1, 1, 1, 1].map((item, index) => (
            <TeamItemComponent key={index} />
          ))}
        </ScrollView>
      </View>
    );
  };
  const DEF = () => {
    return (
      <ScrollView>
        {[1, 1, 1, 1, 1].map((item, index) => (
          <TeamItemComponent key={index} />
        ))}
      </ScrollView>
    );
  };
  const MID = () => {
    return (
      <ScrollView>
        {[1, 1, 1, 1, 1].map((item, index) => (
          <TeamItemComponent key={index} />
        ))}
      </ScrollView>
    );
  };
  const ST = () => {
    return (
      <ScrollView>
        {[1, 1, 1, 1, 1].map((item, index) => (
          <TeamItemComponent key={index} />
        ))}
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="GK" component={GK} />
      <Tab.Screen name="DEF" component={DEF} />
      <Tab.Screen name="MID" component={MID} />
      <Tab.Screen name="ST" component={ST} />
    </Tab.Navigator>
  );
}
