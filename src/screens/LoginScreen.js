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

const LoginScreen = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      // email: "",
      // password: "",
      email: "nilunilesh94@gmail.com",
      password: "123456",
    },
  });
  const dispatch = useDispatch();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleSignIn = async (email, password) => {
    try {
      setloading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const user = doc.data();
          dispatch(setLoginUser(user));
          await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
          ToastAndroid.show("Login successful", ToastAndroid.SHORT);
        });
      } else {
        ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
        console.log("User login failed.");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
      ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };
  const onSubmit = async (data) => {
    setloading(true);
    try {
      await handleSignIn(data.email, data.password);
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
      BackHandler.exitApp();
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
          <AppText style={styles.smallText}>{"Fist Name"}</AppText>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
              pattern: {
                value: emailPattern,
                message: "Invalid Email Address",
              },
            }}
            keyboardType={"email-address"}
            placeholder={"First Name"}
            name="email"
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
