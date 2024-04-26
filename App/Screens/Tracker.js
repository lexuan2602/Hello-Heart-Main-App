import React, { Component } from "react";
import { Text, View } from "react-native";
import BloodPressureChart from "../Components/Tracker/BloodPressureChart";

export default function Tracker() {
  const bloodPressureData = [
    { date: "01-04", systolic: 120, diastolic: 80 },
    { date: "02-04", systolic: 125, diastolic: 82 },
    { date: "03-04", systolic: 130, diastolic: 85 },
    { date: "04-04", systolic: 135, diastolic: 90 },
    { date: "05-04", systolic: 140, diastolic: 92 },
  ];
  return (
    <View>
      <BloodPressureChart />
    </View>
  );
}
