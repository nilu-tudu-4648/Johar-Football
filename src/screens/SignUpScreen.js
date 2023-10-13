import { StyleSheet, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { AppButton, RedStar } from "../components";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { NAVIGATION } from "../constants/routes";
const SignUpScreen = ({ navigation }) => {
  
  const [loading, setloading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    },
  });
  async function getUser(email) {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (doc.data()) {
          ToastAndroid.show("User already Exist", ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, mobile } = data;
    try {
      setloading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await getUser(data.email);
        const user = userCredential.user;
        ToastAndroid.show("Sign Up successfully", ToastAndroid.SHORT);
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
          usersCollectionRef,
          where("userId", "==", user?.uid)
        );
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.empty) {
          await addDoc(usersCollectionRef, {
            userId: user.uid,
            email: user.email,
            firstName,
            lastName,
            mobile,
            proflePic: "",
            admin: "false",
          });
        }
        navigation.navigate(NAVIGATION.LOGIN);
      } else {
        ToastAndroid.show(
          "Sign Up failed. Please try again.",
          ToastAndroid.SHORT
        );
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
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: SIZES.h1 * 2 }}
      >
        <AppText
          bold={true}
          style={{ alignSelf: "center", marginVertical: SIZES.h3 * 2 }}
          size={2.5}
        >
          {"Registration"}
        </AppText>
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
        <AppButton title={"Register"} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
  },
  container: {
    flex: 1,
    padding: SIZES.h3,
    backgroundColor: COLORS.white,
  },
  smallText: {
    fontSize: SIZES.h6,
    alignSelf: "stretch",
  },
});
