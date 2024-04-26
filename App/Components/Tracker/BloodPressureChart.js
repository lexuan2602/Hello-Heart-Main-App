import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// Dữ liệu về huyết áp
const bloodPressureData = {
  labels: ["1", "2", "3", "4", "5"], // Số lần đo
  datasets: [
    {
      data: [120, 125, 130, 135, 140], // Tâm thu
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu đỏ
      strokeWidth: 2, // Độ dày của đường
    },
    {
      data: [80, 85, 90, 95, 100], // Tâm trương
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu xanh dương
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#f7f7f7",
  backgroundGradientTo: "#f7f7f7",
  decimalPlaces: 0, // Không có số thập phân
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu cho trục và nhãn
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const BloodPressureChart = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
        Biểu đồ huyết áp
      </Text>
      <View style={{ position: "relative" }}>
        <LineChart
          data={bloodPressureData}
          width={screenWidth - 20} // Chiều rộng của biểu đồ
          height={220} // Chiều cao của biểu đồ
          chartConfig={chartConfig}
          bezier
          fromZero
          withDots
          style={{ marginVertical: 10 }}
        />

        {/* Hiển thị các giá trị trên mỗi chấm */}
        <View style={{ position: "absolute", top: 30, left: 40 }}>
          {bloodPressureData.datasets[0].data.map((value, index) => (
            <Text
              key={`systolic-${index}`}
              style={{ position: "absolute", left: index * 60 }}
            >
              {value}
            </Text>
          ))}
          {bloodPressureData.datasets[1].data.map((value, index) => (
            <Text
              key={`diastolic-${index}`}
              style={{ position: "absolute", left: index * 60, top: 30 }}
            >
              {value}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BloodPressureChart;
