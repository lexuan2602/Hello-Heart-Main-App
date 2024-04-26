import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import app from "./../../assets/images/app.webp";
import Colors from "./../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";
export default function Login() {
  return (
    <View style={{ alignItems: "center", backgroundColor: "#c4c3be" }}>
      <Image source={app} style={styles.appImage} />
      <View
        style={{
          backgroundColor: Colors.white,
          padding: 25,
          alignItems: "center",
          marginTop: -60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: Dimensions.get("screen").width,
        }}
      >
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Booking Appointment Effortlessly and manage your health journey
        </Text>
        <SignInWithOAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appImage: {
    width: 200,
    height: 400,
    objectFit: "contain",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
