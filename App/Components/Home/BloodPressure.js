import { View, Text } from "react-native";
import { Dimensions, Image, Br } from "react-native";
import React from "react";

export default function BloodPressure() {
  return (
    <View
      style={{
        marginTop: 50,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
        width: Dimensions.get("screen").width * 0.9,
        height: 150,
        backgroundColor: "#fc8181",
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/dbvvth5qb/image/upload/v1712680619/Screenshot_2024_04_09_233431_preview_rev_1_a656528330.png",
        }}
        style={{ width: 160, height: 180, marginTop: -50 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
          180/90
        </Text>
        <Text style={{ width: 180, opacity: 0.7, color: "white" }}>
          See and discover what is your blood pressure meaning!
        </Text>
      </View>
    </View>
  );
}
