import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import GlobalApi from "../Services/GlobalApi";
import { SharedTransitionType } from "react-native-reanimated";

export default function EditProfile() {
  const navigation = useNavigation();

  userId = 1;
  //////////////////////////////////////////////////
  const [profile, setProfile] = useState({
    id: "",
    UserID: "",
    male: "",
    BPMeds: "",
    prevalentStroke: "",
    prevalentHyp: "",
    diabetes: "",
    log_cigsPerDay: "",
    log_totChol: "",
    weight: "",
    height: "",
    log_BMI: "",
    log_heartRate: "",
    log_glucose: "",
    log_age: "",
  });
  const [isProfileDataEmpty, setIsProfileDataEmpty] = useState(true);
  const [errors, setErrors] = useState({});

  const getUserProfile = async () => {
    try {
      const response = await GlobalApi.getProfileWithUserId(userId);
      if (response.data && response.data.length > 0) {
        const profileData = response.data[0].attributes;
        setProfile({
          id: response.data[0].id, // ID từ bên ngoài attributes
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
        });
      } else {
        setIsProfileDataEmpty(true);
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
      setIsProfileDataEmpty(true);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [userId]);

  const handleInputChange = (key, value) => {
    if (key === "height" || key === "weight") {
      const height = key === "height" ? value : profile.height;
      const weight = key === "weight" ? value : profile.weight;
      const BMI = (weight / (height * height)) * 10000;
      setProfile({
        ...profile,
        log_BMI: BMI,
        [key]: value,
      });
    } else {
      setProfile({
        ...profile,
        [key]: value,
      });
    }
  };

  useEffect(() => {
    console.log("Profile after update");
    console.log(profile);
  }, [profile]);

  const handleSave = async () => {
    // Lấy profile ID từ kết quả API
    // try {
    //   const response = await GlobalApi.editUserProfile(profile);
    //   if (response.data !== null) {
    //     console.log("update user profile successfully");
    //     navigation.replace("ProfileStack");
    //   }
    //   console.log(response);
    // } catch (error) {
    //   console.log("Error updating profile", error);
    // }
    console.log(profile);
  };

  const validateAge = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 120) {
      setErrors((prev) => ({
        ...prev,
        age: "Age must be a number between 0 and 120",
      }));
      // handleInputChange("log_age", "0");
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.age;
        return newErrors;
      });
    }
    handleInputChange("log_age", text);
  };

  return (
    // Username
    <View style={styles.container}>
      {/* <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        /> */}
      {/* Sex */}
      <View
        style={{
          backgroundColor: "white",
          zIndex: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: 10 }, // Increase the height for a thicker shadow at the bottom
          // shadowOpacity: 0, // Increase the opacity for a darker shadow
          // shadowRadius: 40, // Increase the radius for a softer shadow
          // elevation: 7, // Increase the elevation to match the changes in shadow
          // width: 400,
          borderBottomColor: "grey",
          // borderBottomWidth: 1,
        }}
      >
        {/* <Button title="Save" onPress={handleSave} /> */}

        <TouchableOpacity title="Back" onPress={handleSave}>
          <Ionicons name="arrow-back-sharp" size={24} color="#fc8181" />
        </TouchableOpacity>

        <TouchableOpacity
          title="Back"
          onPress={() => {
            console.log(2);
            navigation.navigate("ProfileStack");
          }}
        >
          <AntDesign name="save" size={24} color="#fc8181" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ zIndex: -1 }}>
        <Text style={styles.label}>Gender</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            handleInputChange("Sex", value);
          }}
          value={profile?.male === true ? 1 : 0}
          items={[
            { label: "Nam", value: 1 },
            { label: "Nữ", value: 0 },
          ]}
        />
        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          keyboardType="number-pad"
          value={String(profile?.log_age) ? String(profile?.log_age) : "20"}
          onChangeText={(text) => {
            validateAge(Number(text));
          }}
        />
        {errors.age && <Text style={{ marginLeft: 16 }}>{errors.age}</Text>}
        {/* Hiển thị lỗi nếu có */}
        {/* Weight */}
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={String(profile?.weight)}
          onChangeText={(text) => {
            handleInputChange("weight", Number(text));
          }}
        />
        {/* Height */}
        <Text style={styles.label}>Height (cm)</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            handleInputChange("height", value);
          }}
          placeholder={{ label: "Default (150)", value: 150 }}
          value={Number(profile?.height)}
          items={Array.from({ length: 111 }, (_, index) => ({
            label: `${90 + index} cm`,
            value: 90 + index,
          }))}
          style={styles.picker}
        />
        {/* Prevalent Stoke */}
        <Text style={styles.label}>Prevalent Stoke </Text>
        <RNPickerSelect
          value={profile?.prevalentStroke ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("prevalentStroke", value);
          }}
          placeholder={{ label: "Default (No)", value: 0 }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Prevalent Hypertension */}
        <Text style={styles.label}>Prevalent Hypertension </Text>
        <RNPickerSelect
          placeholder={{ label: "Default (No)", value: 0 }}
          value={profile?.prevalentHyp ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("prevalentHyp", value);
          }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Blood Pressure Medication */}
        <Text style={styles.label}>Is Taking Blood Pressure Medication?</Text>
        <RNPickerSelect
          placeholder={{ label: "Default (No)", value: 0 }}
          value={profile?.BPMeds ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("BPMeds", value);
          }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Diabetes Status */}
        <Text style={styles.label}>Diabetes Diagnosis</Text>
        <RNPickerSelect
          value={profile?.diabetes ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("diabetes", value);
          }}
          placeholder={{ label: "Default (0)", value: 0 }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Total Cholesterol */}
        <Text style={styles.label}>Total Cholesterol (mg/dL)</Text>
        <RNPickerSelect
          placeholder={{ label: "Default (50)", value: 50 }}
          value={Number(profile?.log_totChol)}
          onValueChange={(value) => {
            handleInputChange("log_totChol", value);
          }}
          // placeholder={{ label: "Default (140)", value: 140 }}
          items={Array.from({ length: 650 }, (_, index) => ({
            label: `${50 + index}`,
            value: 50 + index,
          }))}
          style={styles.picker}
        />
        {/* Heart Beat */}
        <Text style={styles.label}>Heart Beat (per min)</Text>
        <RNPickerSelect
          value={Number(profile?.log_heartRate)}
          // placeholder={{ label: "Default (140)", value: 140 }}
          onValueChange={(value) => {
            handleInputChange("log_heartRate", value);
          }}
          placeholder={{ label: "Default (80)", value: 80 }}
          items={Array.from({ length: 150 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
        {/* Glucose in Blood */}
        <Text style={styles.label}>Glucose (mg/dL) </Text>
        <RNPickerSelect
          value={Number(profile?.log_glucose)}
          placeholder={{ label: "Default (50)", value: 50 }}
          // placeholder={{ label: "Default (140)", value: 140 }}
          onValueChange={(value) => {
            handleInputChange("log_glucose", value);
          }}
          items={Array.from({ length: 150 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
        {/* cigarrette per day */}
        <Text style={styles.label}>Cigarrette per day</Text>
        <RNPickerSelect
          value={Number(profile?.log_cigsPerDay)}
          placeholder={{ label: "Default (0)", value: 0 }}
          onValueChange={(value) => {
            handleInputChange("log_cigsPerDay", value);
          }}
          items={Array.from({ length: 50 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    marginLeft: 16,
    color: "#fc8181",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#fc8181",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: "90%",
    marginHorizontal: 16,
    borderRadius: 10,
  },
  picker: {
    marginBottom: 16,
  },
});
