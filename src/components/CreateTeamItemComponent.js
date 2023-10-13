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
          <Entypo name="user" size={SIZES.h1 * 2} color="black" />
        </View>
        <View style={{ width: "30%" }}>
          <Text>{item.name}</Text>
        </View>
        <View
          style={{
            width: "40%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <AppText>{item.points}</AppText>
          <AppText>6</AppText>
          <Feather
            name={item.isActive ? "minus-circle" : "plus-circle"}
            onPress={() => addPlayerstoTeamFunc(item)}
            size={24}
            color={item.isActive ? COLORS.red : COLORS.green}
          />
        </View>
      </View>
      <AppDivider />
    </>
  );
};

export default React.memo(CreateTeamItemComponent);
