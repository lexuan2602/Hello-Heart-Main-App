import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../Screens/EditProfile";
import Profile from "../Screens/Profile";

const Stack = createNativeStackNavigator();
export default function ProfileStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileStack" component={Profile}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
    </Stack.Navigator>
  );
}
