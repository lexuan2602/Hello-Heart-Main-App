import { View, Text, Pressable } from "react-native";
import { Dimensions, Image, Br } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import GlobalApi from "../../Services/GlobalApi";

export default function BloodPressure() {
  const { userData } = useContext(AuthContext);
  const [bpData, setBpData] = useState([]);
  const [isBpDataEmpty, setIsBpDataEmpty] = useState(true);
  const userId = userData.userInfo.id;

  const getBpData = async () => {
    if (typeof userId !== "undefined") {
      try {
        const response = await GlobalApi.getProfileWithUserId(userId);
        if (response.data !== null) {
          console.log(response.data);
          setBpData(response.data[0].attributes.BloodPressureData);
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
    getProfileData();
  }, []);

  // check bp data
  useEffect(() => {
    if (!isBpDataEmpty && bpData.length > 0) {
      console.log(bpData);
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
        <Pressable onPress={() => navigateToBloodInput()}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
            180mmHg
          </Text>
        </Pressable>
        <Text style={{ width: 180, opacity: 0.7, color: "white" }}>
          See and discover what is your blood pressure meaning!
        </Text>
      </View>
    </View>
  );
}
