import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import AuthenticateNavigator from "./App/Navigations/AuthenticateNavigator";
import { AuthContext } from "./App/Context/AuthContext";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Outfit-Regular.ttf"),
    appfont_bold: require("./assets/fonts/Outfit-Bold.ttf"),
    appfont_semi: require("./assets/fonts/Outfit-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    // <ClerkProvider
    //   publishableKey={
    //     "pk_test_Y29ycmVjdC1wYW50aGVyLTU2LmNsZXJrLmFjY291bnRzLmRldiQ"
    //   }
    // >
    //   <SafeAreaView style={styles.container}>
    //     <SignedIn>
    //       <NavigationContainer>
    //         <TabNavigation />
    //       </NavigationContainer>
    //     </SignedIn>
    //     <SignedOut>
    //       <Login />
    //     </SignedOut>
    //   </SafeAreaView>
    // </ClerkProvider>

    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {isAuthenticated ? <TabNavigation /> : <AuthenticateNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
