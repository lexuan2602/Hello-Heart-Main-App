import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../App/Services/GlobalApi";
import { AuthContext } from "../App/Context/AuthContext";

export default function Login({ navigation }) {
  const navigation2 = useNavigation();
  const { setUserData, setIsAuthenticated } = useContext(AuthContext);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [response, setResponse] = useState();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Bàn phím được mở
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Bàn phím được đóng
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const hanldeSubmit = async (e) => {
    try {
      const loginUser = {
        identifier: loginData.identifier,
        password: loginData.password,
      };
      const responseData = await GlobalApi.loginUser(loginUser);

      if (responseData?.jwt) {
        const data = {
          jwt: responseData.jwt,
          userInfo: responseData.user,
        };
        setResponse(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof response !== "undefined") {
      if (
        typeof response?.jwt !== "undefined" &&
        typeof response?.userInfo !== "undefined"
      ) {
        setUserData(response);
        setIsAuthenticated(true);
      }
    }
  }, [response]);

  const styles = StyleSheet.create({
    inputKeyboardOn: {
      marginTop: 100,
    },
    inputKeyboardDown: {
      marginTop: -270,
    },
  });
  const containerStyle = keyboardVisible
    ? styles.inputKeyboardOn
    : styles.inputKeyboardDown;

  const handleChange = (name, value) => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  return (
    <KeyboardAvoidingView>
      <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute"
          style={{ marginTop: -100 }}
          source={require("../assets/images/background.png")}
        />
        {/* heart */}
        <View className="flex-row justify-around w-full">
          <Animated.Image
            entering={FadeIn.delay(200).duration(1000).springify()}
            className="h-[90] w-[200]"
            style={{ marginTop: 40 }}
            source={require("../assets/images/heart.png")}
          />
        </View>

        <View className="h-full w-full flex justify-around pb-10 ">
          <View className="flex items-center mx-4 space-y-4">
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                value={loginData.identifier}
                onChangeText={(text) => {
                  handleChange("identifier", text);
                }}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                value={loginData.password}
                onChangeText={(text) => {
                  handleChange("password", text);
                }}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={(e) => {
                  hanldeSubmit(e);
                }}
                className="w-full bg-red-400 p-3 rounded-2xl mb-3"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation2.navigate("Register");
                }}
              >
                <Text className="text-red-400">Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
