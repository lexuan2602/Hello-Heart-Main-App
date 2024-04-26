import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RadioDetail from "../Screens/RadioDetail";
import Home from "../Screens/Home";
import RadioVideo from "../Screens/RadioVideo";
// import Home from "../Pages/Home";
// import CourseDetails from "../Pages/CourseDetails";
// import CourseChapter from "../Pages/CourseChapter";
// import PlayVideo from "../Pages/PlayVideo";

const Stack = createNativeStackNavigator();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={Home}></Stack.Screen>
      <Stack.Screen name="Radio-detail" component={RadioDetail}></Stack.Screen>
      <Stack.Screen name="play-video" component={RadioVideo}></Stack.Screen>
      {/* <Stack.Screen name="course-chapter" component={CourseChapter} />
      <Stack.Screen name="play-video" component={PlayVideo} /> */}
    </Stack.Navigator>
  );
}
