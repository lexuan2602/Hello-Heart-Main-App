import { View, Text, Pressable } from "react-native";
import { Dimensions, Image, Br } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import GlobalApi from "../../Services/GlobalApi";
import { useNavigation } from "@react-navigation/native";

function parseDate(dateStr) {
  return new Date(dateStr);
}

export default function BloodPressure() {
  const navigation = useNavigation();
  const { userData } = useContext(AuthContext);
  const [bpData, setBpData] = useState([]);
  const [sortedBp, setSortedBp] = useState([]);
  const [isBpDataEmpty, setIsBpDataEmpty] = useState(true);
  const [isLastestBp, setIsLastestBp] = useState(null);
  const userId = userData.userInfo.id;

  const getBpData = async () => {
    if (typeof userId !== "undefined") {
      try {
        const response = await GlobalApi.getProfileWithUserId(userId);
        if (response.data !== null) {
          setBpData(response.data[0].attributes.BloodPressureData.data);
          setIsBpDataEmpty(false);
        } else {
          setIsBpDataEmpty(true);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
        setIsBpDataEmpty(true);
      }
    } else {
      console.log("No user id");
    }
  };

  // get profile data
  useEffect(() => {
    getBpData();
  }, []);

  // check bp data
  useEffect(() => {
    if (!isBpDataEmpty && bpData.length > 0) {
      const bpArray = bpData;
      const slicedArray = bpArray.slice(0, 7);
      const sortedData = slicedArray.sort((a, b) => {
        const dateA = parseDate(a.enteredDate);
        const dateB = parseDate(b.enteredDate);
        return dateA - dateB; // Ascending order
      });
      setSortedBp(sortedData);
      const today = new Date();
      const lastestDate = new Date(
        sortedData[sortedData.length - 1].enteredDate
      );
      if (
        lastestDate.getDate() === today.getDate() &&
        lastestDate.getMonth() === today.getMonth() &&
        lastestDate.getFullYear() === today.getFullYear()
      ) {
        setIsLastestBp(true);
      } else {
        setIsLastestBp(false);
      }
    }
  }, [bpData, isBpDataEmpty]);

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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 }, // Increase the height for a thicker shadow at the bottom
        shadowOpacity: 0.5, // Increase the opacity for a darker shadow
        shadowRadius: 20, // Increase the radius for a softer shadow
        elevation: 6, // Increase the elevation to match the changes in shadow
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
        <Pressable
          onPress={() => {
            navigation.push("BPInput");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {isLastestBp === true && sortedBp.length > 0
              ? "Your today Bp is \n" +
                sortedBp[sortedBp.length - 1].bloodPress +
                "mmHg"
              : "Enter your today Bp"}
          </Text>
        </Pressable>
        <Text style={{ width: 180, opacity: 0.7, color: "white" }}>
          See and discover what is your blood pressure meaning!
        </Text>
      </View>
    </View>
  );
}
