import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function EditProfile() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  // const [gender, setGender] = useState("");
  // const [height, setHeight] = useState(150); // Giá trị mặc định là 150 cm
  // const handleSave = () => {
  //   // Xử lý logic khi nhấn nút "Save"
  //   console.log({
  //     username,
  //     weight,
  //     gender,
  //     height,
  //   });
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity
        title="Back"
        onPress={() => {
          console.log(2);
          navigation.navigate("ProfileStack");
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>

    /* // <View>
    //   <Text>Helelelel</Text>
    //   <TouchableOpacity
    //     title="Back"
    //     onPress={() => {
    //       console.log(2);
    //       navigation.navigate("ProfileStack");
    //     }}
    //   >
    //     <Text>Back</Text>
    //   </TouchableOpacity>
    // </View> */
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
});
