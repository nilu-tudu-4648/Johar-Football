import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AppText from "../components/AppText";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { Avatar } from "react-native-paper";
import { NAVIGATION } from "../constants/routes";

export default function ProfileScreen({ navigation, route }) {
  const admin = route.params?.admin;
  const [image, setimage] = useState(null);
  const { user } = useSelector((state) => state.entities.userReducer);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setimage(result.assets[0].uri);
        const urlParts = result.assets[0].uri.split("/");
        const ImageName = urlParts[urlParts.length - 1].split("?")[0];
        //api call
        ToastAndroid.show(
          "Profile picture updated successfully",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(admin ? NAVIGATION.ADMIN_HOME : NAVIGATION.HOME);
      return () => true;
    },
    []
  );
  return (
    <View>
      <View style={styles.headerstyle}>
        <TouchableOpacity onPress={pickImage}>
          {user.ImgUrl ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.2}
              source={{ uri: user.ImgUrl }}
            />
          ) : image ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.2}
              source={{ uri: image }}
            />
          ) : (
            <Avatar.Icon
              size={SIZES.largeTitle * 1.2}
              icon="account"
              style={{ backgroundColor: COLORS.white }}
            />
          )}
        </TouchableOpacity>
        <AppText color={COLORS.white}>
          {user.firstName} {user.lastName}
        </AppText>
      </View>
      <View style={styles.container}>
        <View style={{ ...styles.gpsButton }}>
          <AppText size={1.8}>{user.email}</AppText>
        </View>
        <View style={{ ...styles.gpsButton }}>
          <AppText size={1.8}>Id :-{user.userId}</AppText>
        </View>
        <View style={{ ...styles.gpsButton }}>
          <AppText size={1.8}>+91 {user.mobile}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%",
    height: SIZES.height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
    padding: SIZES.base,
  },
  gpsButton: {
    ...FSTYLES,
    width: "90%",
    borderRadius: SIZES.base,
    padding: SIZES.base,
    elevation: SIZES.base1,
    backgroundColor: COLORS.white,
  },
  profile: {
    ...STYLES,
    height: SIZES.h1 * 1.5,
    width: SIZES.h1 * 1.5,
    borderRadius: (SIZES.h1 * 1.5) / 2,
    backgroundColor: COLORS.white,
  },
  headerstyle: {
    ...FSTYLES,
    backgroundColor: COLORS.purple,
    padding: "10%",
  },
});
