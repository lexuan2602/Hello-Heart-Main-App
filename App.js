import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import Login from "./Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import React, { useState } from "react";
import SignInWithOAuth from "./App/Components/SignInWithOAuth";
import Home from "./App/Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import HomeStackNavigation from "./App/Navigations/HomeStackNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
  const [isLogin, setIsLogin] = useState(false);
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

    // <NavigationContainer>
    //   {/* <Stack.Navigator
    //     initialRouteName="Login"
    //     screenOptions={{ headerShown: false }}
    //   >
    //     <Stack.Sreen name="Login" component={Login} />
    //   </Stack.Navigator> */}
    //   <HomeStackNavigation />
    // </NavigationContainer>

    // <View style={styles.container}>
    //   <NavigationContainer>
    //     {isLogin ? (
    //       // Nếu người dùng đã đăng nhập, hiển thị điều hướng tab
    //       <TabNavigation />
    //     ) : (
    //       // Nếu chưa đăng nhập, hiển thị màn hình đăng nhập
    //       <Login />
    //     )}
    //   </NavigationContainer>
    // </View>

    <View style={styles.container}>
      <NavigationContainer>
        {/* <Home /> */}
        <TabNavigation />
      </NavigationContainer>
    </View>

    // {checkLogIn(isLogin) ? (
    //   <View style={styles.container}>
    //     <NavigationContainer>
    //       {/* <Home /> */}
    //       <TabNavigation />
    //     </NavigationContainer>
    //   </View>
    // ) : (
    // )}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   StatusBar,
// } from "react-native";
// import Login from "./App/Screens/Login";
// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import SignInWithOAuth from "./App/Components/SignInWithOAuth";
// import Home from "./App/Screens/Home";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import TabNavigation from "./App/Navigations/TabNavigation";
// import Profile from "./App/Screens/Profile";
// import React from "react";

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <ClerkProvider
//       publishableKey={
//         "pk_test_Y29ycmVjdC1wYW50aGVyLTU2LmNsZXJrLmFjY291bnRzLmRldiQ"
//       }
//     >
//       <SafeAreaView style={styles.container}>
//         <StatusBar hidden />
//         <SignedIn>
//           <NavigationContainer>
//             <TabNavigation />
//           </NavigationContainer>
//         </SignedIn>
//         <SignedOut>
//           <Login />
//         </SignedOut>
//       </SafeAreaView>
//     </ClerkProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
