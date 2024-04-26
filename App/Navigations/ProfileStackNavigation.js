import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RadioDetail from "../Screens/RadioDetail";
import Home from "../Screens/Home";
import EditProfile from "../Screens/EditProfile";
import Profile from "../Screens/Profile";
// import Home from "../Pages/Home";
// import CourseDetails from "../Pages/CourseDetails";
// import CourseChapter from "../Pages/CourseChapter";
// import PlayVideo from "../Pages/PlayVideo";

const Stack = createNativeStackNavigator();
export default function ProfileStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileStack" component={Profile}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
    </Stack.Navigator>
  );
}
