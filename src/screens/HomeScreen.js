import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, AppText, AppView, HomeHeader } from "../components";
import MatchesItem from "../components/MatchesItem";
import { getTournaments } from "../constants/functions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const { tournaments } = useSelector((state) => state.entities.userReducer);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getTournaments(dispatch,setloading);
  }, []);
  return (
    <>
      <AppLoader loading={loading} />
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
