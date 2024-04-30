import React, { Component, useContext, useEffect, useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BloodPressureChart from "../Components/Tracker/BloodPressureChart";
import GlobalApi from "../Services/GlobalApi";
import { style } from "../Components/Tracker/style";
import PythonApi from "../Services/PythonApi";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";

// Function to get day of the week from a given date
function getDayOfWeek(date) {
  const options = { weekday: "short" }; // Get short form of weekday
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Hàm định dạng ngày và giờ từ một chuỗi ngày giờ
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  let dayLabel;
  if (isToday(date)) {
    dayLabel = "Today"; // Nếu là ngày hôm nay, đặt "Today"
  } else {
    const dayOfWeek = getDayOfWeek(date); // Lấy ngày trong tuần nếu không là hôm nay
    dayLabel = `${dayOfWeek} ${day}-${month}`; // Định dạng ngày và tháng
  }

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return { formattedDate: dayLabel, formattedTime };
}

function parseDate(dateStr) {
  return new Date(dateStr); // Convert the string into a Date object
}

export default function Tracker() {
  const { userData } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isProfileDataEmpty, setIsProfileDataEmpty] = useState(true);
  const [lineChartData, setLineChartData] = useState(null);
  const navigation = useNavigation();
  const userId = userData.userInfo.id;
  // get profile data
  useEffect(() => {
    async function getProfileData() {
      try {
        const response = await GlobalApi.getProfileWithUserId(userId);
        if (response.data !== null) {
          setProfileData(response.data[0].attributes);
          setIsProfileDataEmpty(false);
        } else {
          setIsProfileDataEmpty(true);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
        setIsProfileDataEmpty(true);
      }
    }

    getProfileData();
  }, [userId]);

  useEffect(() => {
    if (profileData && !isProfileDataEmpty) {
      const array = profileData.BloodPressureData.data;
      const slicedArray = array.slice(0, 7);
      const sortedData = slicedArray.sort((a, b) => {
        const dateA = parseDate(a.enteredDate);
        const dateB = parseDate(b.enteredDate);

        // Compare Date objects
        return dateA - dateB; // Ascending order
      });

      // Transforming the given array of objects to the desired format
      const data = sortedData.map((item, index) => {
        const { formattedDate, formattedTime } = formatDate(item.enteredDate);

        const dateLabel = `${formattedDate}`;

        return {
          date: dateLabel,
          value: item.bloodPress, // Using the original bloodPress value
          time: formattedTime,
        };
      });
      setLineChartData(data);
    }
  }, [profileData, isProfileDataEmpty]);

  const handlePress = async () => {
    const data = profileData;
    const featuresData = {
      male: Number(data.male),
      BPMeds: Number(data.BPMeds),
      prevalentStroke: Number(data.prevalentStroke),
      prevalentHyp: Number(data.prevalentHyp),
      diabetes: Number(data.diabetes),
      log_cigsPerDay: Number(data.log_cigsPerDay),
      log_totChol: Number(data.log_totChol),
      log_diaBP: Number(lineChartData[lineChartData.length - 1].value),
      log_BMI: Number(data.log_BMI),
      log_heartRate: Number(data.log_heartRate),
      log_glucose: Number(data.log_glucose),
      log_age: Number(data.log_age),
    };

    const response = await PythonApi.getPrediction(featuresData);
    if (response?.message === "Successfully") {
      console.log(response.data);
      navigation.push("Prediction");
    }
  };
  return (
    <View style={[style.bPressureWrapper]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 40 }}>My Tracker</Text>
      </View>
      {lineChartData && <BloodPressureChart line_chart_data={lineChartData} />}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={trackStyle.customBtn}
          onPress={() => handlePress()}
        >
          <Text style={trackStyle.customBtnText}>Is my BP too high?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const trackStyle = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e2fafd",
  },
  customBtn: {
    alignItems: "center", // Center text inside the button
    justifyContent: "center", // Center content vertically within the button
    width: "50%",
    paddingVertical: 10,
    backgroundColor: "#4eb6c5", // Light background
    borderRadius: 10, // Rounded corners
  },
  customBtnText: {
    fontSize: 16, // Text size
    color: "white", // Text color
    fontWeight: "600",
  },
});
