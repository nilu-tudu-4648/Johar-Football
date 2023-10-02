import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { AppText } from "../components";
const TeamItemComponent = () => {
  return (
    <View
      style={{
        ...FSTYLES,
        padding: SIZES.base * 2,
        borderBottomColor: "gray",
        borderWidth: 0.5,
      }}
    >
      <View style={{ width: "25%" }}>
        <Entypo name="user" size={SIZES.h1*2} color="black" />
      </View>
      <View style={{ width: "30%" }}>
        <Text>NameNameNameName</Text>
      </View>
      <View
        style={{
          width: "40%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <AppText>6</AppText>
        <AppText>6</AppText>
        <Feather name="plus-circle" size={24} color={COLORS.green} />
      </View>
    </View>
  );
};

export default React.memo(TeamItemComponent);
