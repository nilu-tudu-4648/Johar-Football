import { StyleSheet, View, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import { set, useForm } from "react-hook-form";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { AppView } from "../components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLoginUser } from "../store/userReducer";
import { useDispatch } from "react-redux";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NAVIGATION } from "../constants/routes";

const LoginScreen = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const [register, setregister] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "a@gmail.com",
      password: "123456",
    },
  });
  const onSubmit = async (data) => {
    setloading(true);

    try {
      // api calls
      if (!register) {
        await handleSignIn(data.email, data.password);
      } else {
        await handleSignUp(data.email, data.password);
      }
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
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleSignUp = async (email, password) => {
    try {
      setloading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        ToastAndroid.show("Sign Up successfully", ToastAndroid.SHORT);
        setregister(false);
        setValue("email", "");
        setValue("password", "");
      } else {
        console.log("User creation failed.");
      }
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      ToastAndroid.show(
        "Sign Up failed. Please try again.",
        ToastAndroid.SHORT
      );
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    route.params?.register && setregister(route.params?.register);
  }, []);
  const handleSignIn = async (email, password) => {
    try {
      setloading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const user = userCredential.user;

        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));

        dispatch(setLoginUser(user));

        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
          usersCollectionRef,
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
          await addDoc(usersCollectionRef, {
            userId: user.uid,
            email: user.email,
          });
        }

        ToastAndroid.show("Login successful", ToastAndroid.SHORT);
        navigation.navigate(NAVIGATION.HOME);
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

  return (
    <AppView>
      <AppLoader loading={loading} />
      <View style={{ ...STYLES, flex: 1 }}>
        <AppText
          bold={true}
          style={{ alignSelf: "center", marginTop: SIZES.h1 * 2 }}
          size={2.5}
        >
          {register ? "Register" : "Login"}
        </AppText>
      </View>
      <View style={{ ...STYLES, flex: 1 }}>
        <View style={{ width: "100%" }}>
          <AppText style={styles.smallText}>{"Email"}</AppText>
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
            placeholder={"email"}
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
        {/* <View style={{ width: "100%", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => setregister(true)}>
            <AppText style={{ ...styles.smallText }}>
              {"New user? Sign up"}
            </AppText>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <AppButton
          title={register ? "Register" : "Login"}
          onPress={handleSubmit(onSubmit)}
        />
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
