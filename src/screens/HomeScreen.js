import { ScrollView, StyleSheet, View, Image } from "react-native";
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
    getTournaments(dispatch, setloading);
  }, []);
  return (
    <>
      <AppLoader loading={loading} />
      <HomeHeader header={"JOHAR11"} />
      <AppView style={{ flex: 1 }}>
        <View style={{ width: "100%", height: 100 }}>
          <Image
            source={require("../../assets/slide2.jpg")}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <AppText bold={true}>Upcoming Matches</AppText>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 100,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
