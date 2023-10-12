import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { AppText, AppView, HomeHeader } from "../components";
import MatchesItem from "../components/MatchesItem";

const HomeScreen = () => {
  return (
    <>
      <HomeHeader header={"DASHBOARD"} />
      <AppView>
        <View style={{ width: "100%" }}>
          <AppText>Upcoming Matches</AppText>
        </View>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {[1].map((item, i) => (
            <MatchesItem key={i} item={item} />
          ))}
        </ScrollView>
      </AppView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
