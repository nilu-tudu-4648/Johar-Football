import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const AppView = ({ children, style, justify }) => {
  return (
    <View
      style={[
        { ...styles.container, justifyContent: justify && "center" },
        style,
      ]}
    >
      <StatusBar style="auto" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: SIZES.base,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.lightwhite,
  },
});

export default React.memo(AppView);
