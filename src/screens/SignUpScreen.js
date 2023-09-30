import { StyleSheet, View, ToastAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../components/AppLoader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { AppButton, RedStar } from "../components";
const SignUpScreen = ({ navigation, route }) => {
  // const { mobileNo } = route?.params;
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.entities.userReducer);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    },
  });
  console.log("errors", errors);
  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, mobile } = data;
    try {
      setloading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        // firstName,
        // lastName,
        // mobile,
        email,
        password,
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
  const rules = {
    required: "This field is mandatory",
    pattern: {
      value: /^[aA-zZ\s]+$/,
      message: "Only alphabets are allowed for this field.",
    },
  };
  const phonePattern = /^[6-9][0-9]{9}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <>
      <AppLoader loading={loading} />
      <View style={styles.container}>
        <AppText
          bold={true}
          style={{ alignSelf: "center", marginTop: SIZES.h1 * 2 }}
          size={2.5}
        >
          {"Registration"}
        </AppText>
        <View style={{ width: "100%" }}>
          <View>
            <AppText style={styles.smallText}>
              {"First name"}
              <RedStar />
            </AppText>
            <FormInput
              control={control}
              rules={rules}
              placeholder={"First name"}
              name="firstName"
            />
          </View>
          <View>
            <AppText style={styles.smallText}>
              {"Last Name"}
              <RedStar />
            </AppText>
            <FormInput
              control={control}
              rules={rules}
              placeholder={"Last Name"}
              name="lastName"
            />
          </View>
          <View>
            <AppText style={styles.smallText}>
              {"Email"}
              <RedStar />
            </AppText>
            <FormInput
              control={control}
              rules={{
                required: "This field is mandatory",
                pattern: {
                  value: emailPattern,
                  message: "Please enter valid email",
                },
              }}
              placeholder={"Email"}
              name="email"
            />
          </View>
          <View>
            <AppText style={styles.smallText}>
              {"Password"}
              <RedStar />
            </AppText>
            <FormInput
              control={control}
              rules={{
                required: "This field is mandatory",
              }}
              placeholder={"Password"}
              name="password"
            />
          </View>
          <View>
            <AppText style={styles.smallText}>
              {"Mobile No"}
              <RedStar />
            </AppText>
            <FormInput
              control={control}
              rules={{
                required: "This field is mandatory",
                pattern: {
                  value: phonePattern,
                  message: "Please enter valid Phone number",
                },
                minLength: {
                  value: 10,
                  message: "Please enter valid Phone number",
                },
              }}
              keyboardType={"numeric"}
              placeholder={"Enter Mobile Number"}
              name="mobile"
              maxLength={10}
            />
          </View>
        </View>
        <AppButton
          title={"VerifyAndProceed"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
  },
  container: {
    // ...STYLES,
    flex: 1,
    paddingHorizontal: SIZES.h4,
    // flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  smallText: {
    fontSize: SIZES.h6,
    alignSelf: "stretch",
  },
});
