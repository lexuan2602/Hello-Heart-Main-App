import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Categories from "../Components/Home/Categories";
import BloodPressure from "../Components/Home/BloodPressure";
import HeartRadio from "../Components/Home/HeartRadio";
import { AuthContext } from "../Context/AuthContext";

export default function Home({ route, navigation }) {
  const { userData } = useContext(AuthContext);
  return (
    <View style={{ padding: 20, marginTop: 25 }}>
      <Header userData={userData.userInfo.username} />
      <BloodPressure />
      {/* <SearchBar setSearchText={(value) => console.log(value)} /> */}
      <Categories />
      <HeartRadio />
      {/* <Slider /> */}
      {/* <Button title="SignOut" onPress={() => signOut()}></Button> */}
      {/* <Text>Home jjj</Text> */}
    </View>
  );
}
