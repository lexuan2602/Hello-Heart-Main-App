// import {
//   View,
//   Text,
//   Image,
//   KeyboardAvoidingView,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { TextInput, StyleSheet, Keyboard } from "react-native";
// import { useState, useEffect } from "react";
// // import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";
// import GlobalApi from "../App/Services/GlobalApi";

// export default function Login() {
//   const navigation = useNavigation();
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [loginData, setLoginData] = useState({
//     identifier: "",
//     password: "",
//   });
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         setKeyboardVisible(true); // Bàn phím được mở
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         setKeyboardVisible(false); // Bàn phím được đóng
//       }
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   const hanldeSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const loginUser = {
//         identifier: loginData.identifier,
//         password: loginData.password,
//       };
//       console.log(loginUser);
//       const responseData = await GlobalApi.loginUser(loginUser);
//       console.log(typeof responseData);
//       if (responseData.jwt) {
//         console.log("log in thanh cong");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const styles = StyleSheet.create({
//     inputKeyboardOn: {
//       // backgroundColor: "blue",
//       marginTop: 100,
//     },
//     inputKeyboardDown: {
//       marginTop: -270,
//     },
//   });
//   const containerStyle = keyboardVisible
//     ? styles.inputKeyboardOn
//     : styles.inputKeyboardDown;

//   const handleChange = (name, value) => {
//     setLoginData((prevLoginData) => ({
//       ...prevLoginData,
//       [name]: value,
//     }));
//   };

//   return (
//     <KeyboardAvoidingView>
//       <View className="bg-white h-full w-full">
//         <StatusBar style="light" />
//         <Image
//           className="h-full w-full absolute"
//           style={{ marginTop: -100 }}
//           source={require("../assets/images/background.png")}
//         />
//         {/* heart */}
//         <View className="flex-row justify-around w-full">
//           <Animated.Image
//             entering={FadeIn.delay(200).duration(1000).springify()}
//             className="h-[90] w-[200]"
//             style={{ marginTop: 40 }}
//             source={require("../assets/images/heart.png")}
//           />
//         </View>

//         <View className="h-full w-full flex justify-around pb-10 ">
//           {/* <View className="flex items-center">
//           <Text
//             className="text-white
//            font-bold tracking-wider text-5xl"
//           >
//             Login
//           </Text>
//         </View> */}
//           {/* {!keyboardVisible && ( // Chỉ hiển thị nếu bàn phím không mở
//             <View className="flex items-center">
//               <Text
//                 className="text-black
//                font-bold tracking-wider text-5xl"
//               >
//                 Login
//               </Text>
//             </View>
//           )} */}

//           <View
//             className="flex items-center mx-4 space-y-4"
//             // style={{ marginTop: -100 }}
//           >
//             <Animated.View
//               entering={FadeInDown.delay(200).duration(1000).springify()}
//               className="bg-black/5 p-5 rounded-2xl w-full"
//             >
//               <TextInput
//                 placeholder="Email"
//                 placeholderTextColor={"gray"}
//                 keyboardType="email-address"
//                 value={loginData.identifier}
//                 onChangeText={(text) => {
//                   handleChange("identifier", text);
//                 }}
//               />
//             </Animated.View>
//             <Animated.View
//               entering={FadeInDown.delay(400).duration(1000).springify()}
//               className="bg-black/5 p-5 rounded-2xl w-full mb-3"
//             >
//               <TextInput
//                 placeholder="Password"
//                 placeholderTextColor={"gray"}
//                 secureTextEntry
//                 value={loginData.password}
//                 onChangeText={(text) => {
//                   handleChange("password", text);
//                 }}
//               />
//             </Animated.View>
//             <Animated.View
//               entering={FadeInDown.delay(600).duration(1000).springify()}
//               className="w-full"
//             >
//               <TouchableOpacity
//                 onPress={(e) => {
//                   hanldeSubmit(e);
//                 }}
//                 className="w-full bg-red-400 p-3 rounded-2xl mb-3"
//               >
//                 <Text className="text-xl font-bold text-white text-center">
//                   Login
//                 </Text>
//               </TouchableOpacity>
//             </Animated.View>
//             <Animated.View
//               entering={FadeInDown.duration(1000).springify()}
//               className="flex-row justify-center"
//             >
//               <Text>Don't have an account? </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate("register");
//                 }}
//               >
//                 <Text className="text-red-400">Sign Up</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//     // <View className="bg-white h-full w-full">
//     //   <StatusBar style="light" />
//     //   <Image
//     //     className="h-full w-full absolute"
//     //     style={{ marginTop: -100 }}
//     //     source={require("../assets/images/background.png")}
//     //   />
//     //   <View className="flex-row justify-around w-full">
//     //     <Animated.Image
//     //       entering={FadeIn.delay(200).duration(1000).springify()}
//     //       className="h-[90] w-[300]"
//     //       style={{ marginTop: 40, backgroundColor: "red" }}
//     //       source={require("../assets/images/heart.png")}
//     //     />
//     //   </View>
//     // </View>
//   );
// }

// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   Dimensions,
// //   TouchableOpacity,
// // } from "react-native";
// // import React from "react";
// // import app from "./../../assets/images/app.webp";
// // import Colors from "./../../assets/Shared/Colors";
// // import SignInWithOAuth from "../Components/SignInWithOAuth";
// // export default function Login() {
// //   return (
// //     <View style={{ alignItems: "center", backgroundColor: "#c4c3be" }}>
// //       <Image source={app} style={styles.appImage} />
// //       <View
// //         style={{
// //           backgroundColor: Colors.white,
// //           padding: 25,
// //           alignItems: "center",
// //           marginTop: -60,
// //           borderTopLeftRadius: 20,
// //           borderTopRightRadius: 20,
// //           width: Dimensions.get("screen").width,
// //         }}
// //       >
// //         <Text style={styles.heading}>Your Ultimate Doctor</Text>
// //         <Text style={styles.heading}>Appointment Booking App</Text>
// //         <Text style={{ textAlign: "center", marginTop: 20 }}>
// //           Booking Appointment Effortlessly and manage your health journey
// //         </Text>
// //         <SignInWithOAuth />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   appImage: {
// //     width: 200,
// //     height: 400,
// //     objectFit: "contain",
// //   },
// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //   },
// // });
