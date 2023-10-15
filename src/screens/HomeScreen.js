import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { AppText, AppView, HomeHeader } from "../components";
import MatchesItem from "../components/MatchesItem";
import { getTournaments } from "../constants/functions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const { tournaments } = useSelector((state) => state.entities.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getTournaments(dispatch);
  }, []);
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
          {tournaments.map((item, i) => (
            <MatchesItem key={i} item={item} />
          ))}
        </ScrollView>
      </AppView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
