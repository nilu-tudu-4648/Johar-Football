import React from "react";
import "react-native-gesture-handler";
import { store } from "./src/store/configureStore";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
// import 'expo-dev-client';
const App = () => {
  // eas update --branch preview --message "Updating the app"
  // eas update --branch prod --message "Updating the app"
  // eas build -p android --profile preview
  // eas build -p android --profile prod
  // eas build --profile development --platform android

  // eas build --platform android
  // npx expo  start --dev-client
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <DrawerNavigator />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
