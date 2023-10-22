import { StyleSheet, View, ToastAndroid, BackHandler } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { AppView } from "../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NAVIGATION } from "../constants/routes";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../store/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_COLLECTIONS } from "../constants/data";

const LoginScreen = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      // phone: "9155186701",
      // password: "123456",
    },
  });
  const dispatch = useDispatch();
  async function getUser(mobile) {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.USERS),
      where("mobile", "==", mobile)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // User with the provided mobile number exists
      return querySnapshot.docs[0].data();
    }
    // User does not exist
    return null;
  }

  const handleSignIn = async (phone, password) => {
    const userExists = await getUser(phone);

    if (!userExists) {
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      console.log("User login failed.");
      return;
    }

    const checkPassword = userExists.password === password;

    if (checkPassword) {
      dispatch(setLoginUser(userExists));
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(userExists));
      ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      console.log("User login failed.");
    }
  };

  const onSubmit = async (data) => {
    setloading(true);
    try {
      await handleSignIn(data.phone, data.password);
    } catch (error) {
      console.log(error, "err");
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };
  const rules = {
    required: "This field is mandatory",
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.WELCOME);
      return () => true;
    },
    []
  );
  return (
    <AppView>
      <AppLoader loading={loading} />
      <View style={{ ...STYLES, flex: 1 }}>
        <AppText
          bold={true}
          style={{ alignSelf: "center", marginTop: SIZES.h1 * 2 }}
          size={2.5}
        >
          {"Login"}
        </AppText>
      </View>
      <View style={{ ...STYLES, flex: 1 }}>
        <View style={{ width: "100%" }}>
          <AppText style={styles.smallText}>{"Phone Number"}</AppText>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
              pattern: {
                message: "Invalid Phone Number",
              },
            }}
            keyboardType={"numeric"}
            placeholder={"Enter Phone Number"}
            name="phone"
          />
        </View>
        <View style={{ width: "100%" }}>
          <AppText style={styles.smallText}>{"Password"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"password"}
            name="password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <AppButton title={"Login"} onPress={handleSubmit(onSubmit)} />
      </View>
    </AppView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
  },
  container: {
    ...STYLES,
    width: "100%",
    marginTop: SIZES.h1,
    height: SIZES.height,
    paddingHorizontal: SIZES.h4,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  smallText: {
    fontSize: SIZES.h6,
    alignSelf: "stretch",
  },
});
