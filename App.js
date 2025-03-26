import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import BottomTab from "./src/navigations/Bottomtab";
import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import AppNavigation from "./src/navigations";
import Store from "./src/Store/Store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      // SplashScreen.hide(); // Hide the splash screen (Make sure to install react-native-splash-screen properly)
    }, 2000);
  }, []);

  const publishableKey =
    "pk_test_51PkJ4d06ShRfWNZFtQI3nuM25eMT1cbHjjSJRFHbNozetlH26nH2PENmyDVQt7F166VQk2KgSm48OKnrqE291A4A00F4WbmBYM";

  return (
    <Provider store={Store}>
      <StripeProvider publishableKey={publishableKey}>
        <NavigationContainer>
          <SafeAreaProvider>
            <AppNavigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
