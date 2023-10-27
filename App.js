import React from "react";
import "react-native-gesture-handler";
import { store } from "./src/store/configureStore";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  // eas build -p android --profile preview
  // eas update --branch preview --message "Updating the app"

  // eas build -p android --profile prod
  // eas update --branch prod --message "Updating the app"
  return (
    <NavigationContainer>
       <StatusBar style="light" />
        <Provider store={store}>
          <PaperProvider>
            <DrawerNavigator />
          </PaperProvider>
        </Provider>
    </NavigationContainer>
  );
};

export default App;
