import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Login";
import SignupScreen from "../../Screens/SignUpScreen";

const Stack = createNativeStackNavigator();
export default function AuthenticateNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={SignupScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
