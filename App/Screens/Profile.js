import { Component, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Services/GlobalApi";
import { AuthContext } from "../Context/AuthContext";

const window_width = Dimensions.get("window").width;

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const userId = userData.userInfo.id;
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [isProfileDataEmpty, setIsProfileDataEmpty] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const getUserProfile = async () => {
    try {
      const response = await GlobalApi.getProfileWithUserId(userId);
      const response2 = await GlobalApi.getUser(userId);
      console.log(response);
      console.log(response2);
      var result = {};
      if (response.data && response.data.length > 0) {
        const profileData = response.data[0].attributes;
        result = {
          UserID: profileData.UserID,
          male: profileData.male,
          BPMeds: profileData.BPMeds,
          prevalentStroke: profileData.prevalentStroke,
          prevalentHyp: profileData.prevalentHyp,
          diabetes: profileData.diabetes,
          log_cigsPerDay: profileData.log_cigsPerDay,
          log_totChol: profileData.log_totChol,
          weight: profileData.weight,
          height: profileData.height,
          log_BMI: profileData.log_BMI,
          log_heartRate: profileData.log_heartRate,
          log_glucose: profileData.log_glucose,
          log_age: profileData.log_age,
        };
      }

      if (response2.data !== null) {
        const userName = response2.username;
        result = { ...result, username: userName };
      }
      console.log(result);
      if (Object.keys(result).length !== 0) {
        setProfile(result);
        setIsProfileDataEmpty(false);
      }
      return result;
    } catch (e) {
      console.error("Error fetching profile:", e);
      setIsProfileDataEmpty(true);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (!isProfileDataEmpty && Object.keys(profile).length > 0) {
      console.log("My profile: ", profile);
    }
  }, [isProfileDataEmpty, profile]);

  const hanldeLogout = () => {
    if (isAuthenticated) {
      setIsAuthenticated(!isAuthenticated);
      navigation.replace("login");
    }
  };
  return (
    <View class="container" style={styles.container}>
      <ScrollView>
        <View class="header">
          <View
            class="Title"
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "row",
              paddingLeft: 20,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "900", fontSize: 30, color: "#fc8181" }}>
              Hello Heart
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log(2);
                navigation.navigate("EditProfile");
              }}
            >
              {/* <Text
                style={{ fontWeight: "200", fontSize: 20, color: "#fc8181" }}
              >
                Edit Profile
              </Text> */}
              <AntDesign
                name="edit"
                size={24}
                color="#fc8181"
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.profileIconContainer}>
              <FontAwesome name="user" size={40} color="#fc8181" />
            </View>
            <Text style={styles.profileHeaderText}>My Profile</Text>
          </View>
        </View>
        <View style={styles.personalInfoRowContainer}>
          {/* Start of Username Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Username
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.username}
              </Text>
            </View>
          </View>
          {/* Start of Sex Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Sex
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.male === true
                  ? "Male"
                  : "Female"}
              </Text>
            </View>
          </View>
          {/* Start of DOB Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Age
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && Number(profile.log_age)}
              </Text>
            </View>
          </View>
          {/* Start of Weight Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Weight
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.weight}
              </Text>
            </View>
          </View>
          {/* Start of Height Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.height}
              </Text>
            </View>
          </View>
          {/* Start of Height Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Prevalent Stroke
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.prevalentStroke === true
                  ? "Yes"
                  : "No"}
              </Text>
            </View>
          </View>
          {/* End of Height Row */}
          {/* Start of BMI */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                BMI
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.log_BMI}
              </Text>
            </View>
          </View>
          {/* End of BMI Row */}
          {/* Start of Cholesterol Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Prevalent Hypertension
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.prevalentHyp === true
                  ? "Yes"
                  : "No"}
              </Text>
            </View>
          </View>
          {/* End of Cholesterol Row */}

          {/* Start of Smoking Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Taking Blood Pressure Medication
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.BPMeds === true ? "Yes" : "No"}
              </Text>
            </View>
          </View>
          {/* End of Smoking Row */}

          {/* Start of Alcohol Intake Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Diabetes Diagnosis
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.diabetes === true
                  ? "Yes"
                  : "No"}
              </Text>
            </View>
          </View>
          {/* End of Alcohol Intake Row */}

          {/* Start of Alcohol Intake Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Total Cholesterol (mg/dL)
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.log_totChol}
              </Text>
            </View>
          </View>
          {/* End of Alcohol Intake Row */}

          {/* Start of Physical Activities Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Heart Beat (per min)
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.log_heartRate}
              </Text>
            </View>
          </View>
          {/* End of Physical Activitie Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Glucose
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.log_glucose}
              </Text>
            </View>
          </View>
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Cigarrettes per day
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>
                {!isProfileDataEmpty && profile.log_cigsPerDay}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => hanldeLogout()}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ea8f8f",
              width: window_width * 0.55,
              borderRadius: 20,
              marginBottom: 10,
              height: 45,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  profileIconContainer: {
    backgroundColor: "#fddede",
    width: 70,
    height: 70,
    display: "flex",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    // marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#4e4e4e",
  },
  personalInfoRowContainer: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  personalInfoRow: {
    padding: 20,
    display: "flex",
    gap: 20,
    width: "80%",
    borderWidth: 2,
    borderColor: "#fddede",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paddingIconInfoRow: {
    paddingHorizontal: 10,
  },
});
