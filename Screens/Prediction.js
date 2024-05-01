import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App/Context/AuthContext";
import moment from "moment";
import GlobalApi from "../App/Services/GlobalApi";
import PythonApi from "../App/Services/PythonApi";
export default function Prediction() {
  const { userData } = useContext(AuthContext);
  const currentDate = moment().format("DD.MM.YYYY");
  const userId = userData.userInfo.id;
  const [patientProfile, setPatientProfile] = useState({});
  const [solutions, setSolutions] = useState([]);
  const [patientPrediction, setPatientPrediction] = useState(null);
  const [isPatientFetched, setIsPatientFetched] = useState(false);

  async function fetchPatientProfile(id) {
    try {
      const response = await GlobalApi.getProfileWithUserId(id);
      if (response.data && response.data.length > 0) {
        console.log("profile Data", response.data);
        const profileData = response.data[0].attributes;
        setPatientProfile({
          id: response.data[0].id, // ID từ bên ngoài attributes
          UserID: profileData.UserID,
          male: profileData.male,
          BPMeds: profileData.BPMeds,
          prevalentStroke: profileData.prevalentStroke,
          prevalentHyp: profileData.prevalentHyp,
          diabetes: profileData.diabetes,
          BloodPressureData: profileData.BloodPressureData.data,
          log_cigsPerDay: profileData.log_cigsPerDay,
          log_totChol: profileData.log_totChol,
          weight: profileData.weight,
          height: profileData.height,
          log_BMI: profileData.log_BMI,
          log_heartRate: profileData.log_heartRate,
          log_glucose: profileData.log_glucose,
          log_age: profileData.log_age,
        });
        setIsPatientFetched(true);
      } else {
        setIsPatientFetched(false);
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
      setIsPatientFetched(false);
    }
  }

  async function getPatientPrediction(patientProfile) {
    try {
      const featuresData = {
        male: Number(patientProfile.male),
        BPMeds: Number(patientProfile.BPMeds),
        prevalentStroke: Number(patientProfile.prevalentStroke),
        prevalentHyp: Number(patientProfile.prevalentHyp),
        diabetes: Number(patientProfile.diabetes),
        log_cigsPerDay: Number(patientProfile.log_cigsPerDay),
        log_totChol: Number(patientProfile.log_totChol),
        log_diaBP: Number(patientProfile.BloodPressureData[0].bloodPress),
        log_BMI: Number(patientProfile.log_BMI),
        log_heartRate: Number(patientProfile.log_heartRate),
        log_glucose: Number(patientProfile.log_glucose),
        log_age: Number(patientProfile.log_age),
      };
      const response = await PythonApi.getPrediction(featuresData);
      if (response?.message === "Successfully") {
        setPatientPrediction(response.data[0]);
      }
    } catch (error) {
      console.log("Error while getting prediction", error);
    }
  }

  async function fetchSolutionsList(patientProfile) {
    const featuresData = {
      patient: [
        Number(patientProfile.prevalentStroke),
        Number(patientProfile.prevalentHyp),
        Number(patientProfile.diabetes),
        Number(patientProfile.log_cigsPerDay) > 0 ? 1 : 0,
        Number(patientProfile.log_totChol) > 160 ? 1 : 0,
        Number(patientProfile.log_BMI) >= 25 ? 1 : 0,
        Number(patientProfile.log_glucose) >= 200 ? 1 : 0,
      ],
    };
    try {
      const response = await PythonApi.getSolutions(featuresData);
      console.log("solution response: ", response);
      if (response?.best_solution.length > 0) {
        const index = response.best_solution.reduce(
          (accumulator, currentValue, index) => {
            const n = response.best_solution.length;
            // Calculate the power of 2 based on the index (most significant bit is on the left)
            const power = n - 1 - index;
            // Calculate the contribution of the current bit and add it to the accumulator
            return accumulator + currentValue * 2 ** power;
          },
          0
        );
        try {
          const response = await GlobalApi.getSolutionBasedOnIndex(index);
          console.log(response);
          if (response.data[0] !== null) {
            console.log(response.data[0].attributes);
            const solutionStr = response.data[0].attributes.SolutionDescription;
            const solutionsArray = solutionStr
              .split(".")
              .map((sentence) => sentence.trim()) // Trim each part to remove extra spaces
              .filter((sentence) => sentence.length > 0); // Remove any empty strings
            setSolutions(solutionsArray);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    } catch (error) {
      console.log("Error while getting solutions", error);
    }
  }

  // fetch patient profile
  useEffect(() => {
    fetchPatientProfile(userId);
  }, []);

  // prediction and get solutions
  useEffect(() => {
    if (isPatientFetched && Object.keys(patientProfile).length > 0) {
      getPatientPrediction(patientProfile);
      fetchSolutionsList(patientProfile);
    }
  }, [patientProfile, isPatientFetched]);

  const shouldRenderSolutions = patientPrediction && solutions.length > 0;

  return (
    <ScrollView>
      <View style={style.container}>
        <View>
          <Text style={style.primeHeader}>Your result</Text>
        </View>
        <View style={style.assumptionContainer}>
          <Image
            source={
              shouldRenderSolutions && patientPrediction === 1
                ? require("../assets/images/happy.png")
                : require("../assets/images/sad.png")
            }
            style={{ width: 80, height: 80, marginTop: 7 }}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              fontFamily: "segoeui",
            }}
          >
            Your heart status is:
            <Text style={{ color: "#77e857" }}>
              {shouldRenderSolutions && patientPrediction === 1
                ? " Good"
                : " Not good"}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#879596",
              fontWeight: "700",
              fontFamily: "segoeui",
            }}
          >
            as of {shouldRenderSolutions && currentDate.toString()} | Based on
            your measurements
          </Text>
          <Text
            style={
              shouldRenderSolutions && patientPrediction === 1
                ? { fontWeight: "700", fontSize: 20, fontFamily: "segoeui" }
                : {
                    fontWeight: "700",
                    fontSize: 20,
                    fontFamily: "segoeui",
                    color: "#f43636",
                  }
            }
          >
            {shouldRenderSolutions && patientPrediction === 1
              ? "You're on the right track"
              : "Warning"}
          </Text>
          <Text style={style.centeredText}>
            {shouldRenderSolutions && patientPrediction === 1
              ? " Your heart is feeling better and better! Keep up the good work. The longer you stick to a healthy lifestyle, the easier it becomes."
              : " Please"}
          </Text>
          <View style={style.sharedBtn}>
            <Text
              style={{
                fontFamily: "segeoui",
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              Share your result
            </Text>
          </View>
        </View>
        <View style={style.assumptionContainer}>
          <View
            style={{
              height: 40,
              marginTop: 5,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                fontFamily: "segeoui",
                color: "#535151",
              }}
            >
              Ways to keep your heart healthy
            </Text>
          </View>
          {shouldRenderSolutions &&
            solutions.map((item, index) => (
              <TouchableHighlight style={{ width: "90%" }} key={index}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#fffafa",
                    marginBottom: 15,
                    padding: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      marginHorizontal: 10,
                      color: "#3b3939",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const renderSolutionsList = async (patientPrediction, solutions) => {
  return <View></View>;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "white",
    fontFamily: "segoeui",
  },
  primeHeader: {
    fontSize: 30,
    fontWeight: "600",
  },
  assumptionContainer: {
    fontFamily: "monospace", // or any monospace font you add
    fontSize: 16,
    textAlign: "center",
    width: "80%",
    gap: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#e2fafd",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  centeredText: {
    textAlign: "center", // Center the text
    fontSize: 13,
    color: "#879596",
    fontFamily: "segoeui",
    fontWeight: "700",
  },
  sharedBtn: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#b9f3fb",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 }, // Increase the height for a thicker shadow at the bottom
    shadowOpacity: 0.8, // Increase the opacity for a darker shadow
    shadowRadius: 20, // Increase the radius for a softer shadow
    elevation: 7, // Increase the elevation to match the changes in shadow
    borderRadius: 10,
  },
});
