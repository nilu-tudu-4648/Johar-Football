import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppText } from "../components";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, WNFONTS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const ContestHeader = ({ title }) => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(4000);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400); // 86400 seconds in a day
    const hours = Math.floor((time % 86400) / 3600); // 3600 seconds in an hour
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const startTimer = useCallback(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timerId = startTimer();
    return () => clearTimeout(timerId);
  }, [startTimer]);

  const formattedTime = formatTime(timeLeft);

  return (
    <View style={{ backgroundColor: COLORS.purple, padding: SIZES.base }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "40%",
          justifyContent: "space-around",
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          onPress={() => navigation.goBack()}
          color={COLORS.white}
        />
        <View>
          <AppText color={COLORS.white} style={WNFONTS.h5}>
            {title}
          </AppText>
          <AppText color={COLORS.white} style={WNFONTS.h6}>
            {formattedTime} left
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default ContestHeader;

const styles = StyleSheet.create({});
