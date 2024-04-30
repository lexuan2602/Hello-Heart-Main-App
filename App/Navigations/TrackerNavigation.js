import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../Screens/EditProfile";
import Tracker from "../Screens/Tracker";
import Prediction from "../../Screens/Prediction";

const Stack = createNativeStackNavigator();
export default function TrackerNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tracker" component={Tracker}></Stack.Screen>
      <Stack.Screen name="Prediction" component={Prediction}></Stack.Screen>
    </Stack.Navigator>
  );
}
