import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, AppText, AppView, HomeHeader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../constants/functions";
import { NAVIGATION } from "../constants/routes";

const AllUsersScreen = ({ navigation }) => {
  const { allusers } = useSelector((state) => state.entities.adminReducer);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllUsers(dispatch,setloading);
  }, []);
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.ADMIN_HOME);
      return () => true;
    },
    []
  );
  return (
    <>
      <AppLoader loading={loading} />
      <HomeHeader header={"ALL USERS"} />
      <AppView>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {allusers.map((item, i) => (
            <View key={i} style={styles.card}>
              <AppText>{item.id}</AppText>
              <AppText>
                {item.firstName} {item.lastName}
              </AppText>
              <AppText>{item.email}</AppText>
            </View>
          ))}
        </ScrollView>
      </AppView>
    </>
  );
};

export default AllUsersScreen;

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
});
