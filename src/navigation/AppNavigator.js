import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NAVIGATION } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../store/userReducer";

import {
  HomeScreen,
  LoginScreen,
  MatchDetailsScreen,
  SignUpScreen,
  WelcomeScreen,
} from "../screens";
import { StyleHeader } from "../components";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { userLoggedIn, user } = useSelector(
    (state) => state.entities.userReducer
  );
  const dispatch = useDispatch();

  const checkUserDetails = async () => {
    try {
      const loggedInUserString = await AsyncStorage.getItem("loggedInUser");
      if (loggedInUserString) {
        const loggedInUser = JSON.parse(loggedInUserString);
        dispatch(setLoginUser(loggedInUser));
      } else {
        dispatch(setLoginUser(null));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  React.useEffect(() => {
    checkUserDetails();
  }, [userLoggedIn]);
  const options = { headerShown: false };
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: !user ? false : true,
        header: ({ navigation }) => <StyleHeader />,
      })}
    >
      {!user ? (
        <>
          <Stack.Screen name={NAVIGATION.WELCOME} component={WelcomeScreen} />
          <Stack.Screen name={NAVIGATION.LOGIN} component={LoginScreen} />
          <Stack.Screen name={NAVIGATION.REGISTER} component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={options}
            name={NAVIGATION.HOME}
            component={HomeScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.MATCH_DETAILS}
            component={MatchDetailsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
