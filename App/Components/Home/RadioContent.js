import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RadioContent({ Videos }) {
  const navigation = useNavigation();
  console.log("Radio COntent");
  console.log(Videos);
  const onChapterPress = (courseContent) => {
    navigation.navigate("play-video", {
      courseContent: courseContent,
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Course Content</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={Videos}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onChapterPress(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: Colors.white,
              marginBottom: 5,
              padding: 13,
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: Colors.gray,
                marginRight: 20,
              }}
            >
              {index + 1}
            </Text>

            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.Description}
            </Text>
            <Ionicons
              name="play-circle"
              size={24}
              style={{ position: "absolute", right: 10 }}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
