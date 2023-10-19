import React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { AppDivider, AppText } from ".";
const CreateTeamItemComponent = ({ item, addPlayerstoTeamFunc }) => {
  return (
    <>
      <View
        style={{
          ...FSTYLES,
          padding: SIZES.base * 2,
          backgroundColor: item.isActive ? COLORS.lightgray : COLORS.white,
        }}
      >
        <View style={{ width: "25%" }}>
          <Entypo name="user" size={SIZES.h1 * 1.5} color="black" />
        </View>
        <View style={{ width: "30%" }}>
          <Text>{item.name}</Text>
          <Text>{item.teamName}</Text>
        </View>
        <View
          style={{
            width: "40%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <AppText></AppText>
          <AppText></AppText>
          <Feather
            name={item.isActive ? "minus-circle" : "plus-circle"}
            onPress={() => addPlayerstoTeamFunc(item)}
            size={SIZES.h1 * 1}
            color={item.isActive ? COLORS.red : COLORS.green}
          />
        </View>
      </View>
      <AppDivider />
    </>
  );
};

export default React.memo(CreateTeamItemComponent);
