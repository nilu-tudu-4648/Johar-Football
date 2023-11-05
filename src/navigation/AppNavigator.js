import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NAVIGATION } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../store/userReducer";

import {
  AlertScreen,
  HomeScreen,
  LoginScreen,
  MatchDetailsScreen,
  PointsSystemScreen,
  ProfileScreen,
  SelectCaptainScreen,
  SignUpScreen,
  WelcomeScreen,
  WinningPointsScreen,
} from "../screens";
import { StyleHeader } from "../components";
import CreateTeamScreen from "../screens/CreateTeamScreen";
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
          {user.admin === "true" ? (
            <>
              <Stack.Screen
                options={options}
                name={"Alert"}
                component={AlertScreen}
              />
             
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
                name={NAVIGATION.PROFILE}
                component={ProfileScreen}
              />
              <Stack.Screen
                options={options}
                name={NAVIGATION.MATCH_DETAILS}
                component={MatchDetailsScreen}
              />
              <Stack.Screen
                options={options}
                name={NAVIGATION.CREATE_TEAM}
                component={CreateTeamScreen}
              />
              <Stack.Screen
                options={options}
                name={NAVIGATION.SELECT_CAPTAIN}
                component={SelectCaptainScreen}
              />
              <Stack.Screen
                options={options}
                name={NAVIGATION.WINNING_POINTS}
                component={WinningPointsScreen}
              />
            </>
          )}
          <Stack.Screen
            options={options}
            name={NAVIGATION.POINTS_SYSTEM}
            component={PointsSystemScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
