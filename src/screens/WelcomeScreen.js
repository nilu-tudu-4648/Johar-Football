import { BackHandler, StyleSheet, View } from "react-native";
import React from "react";
import { AppButton, AppText, AppView } from "../components";
import { SIZES, STYLES } from "../constants/theme";
import { Image } from "react-native";
import { NAVIGATION } from "../constants/routes";

const WelcomeScreen = ({ navigation }) => {
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      BackHandler.exitApp();
      return () => true;
    },
    []
  );
  return (
    <AppView>
      <View
        style={{
          ...STYLES,
          flex: .7,
        }}
      >
        <Image
          source={require("../../assets/welcome.jpg")}
          style={{ width: "100%", resizeMode: "contain", height: "100%" }}
        />
      </View>
      <View
        style={{
          ...STYLES,
          flex: 0.3,
          justifyContent: "space-between",

        }}
      >
        <View style={{ ...STYLES }}>
          <AppText size={2.5} bold={true}>
            Create Teams
          </AppText>
          <AppText>Use your skills to pick the right players</AppText>
          <AppText>and earn fantasy points</AppText>
        </View>
        <View
          style={{
            ...STYLES,
          }}
        >
          <AppButton
            title="REGISTER"
            style={{ marginVertical: SIZES.h4 }}
            onPress={() =>
              navigation.navigate(NAVIGATION.REGISTER, { register: true })
            }
          />
          <AppButton
            title="LOGIN"
            style={{ marginVertical: SIZES.h4 }}
            onPress={() =>
              navigation.navigate(NAVIGATION.LOGIN, { register: false })
            }
          />
        </View>
      </View>
    </AppView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
