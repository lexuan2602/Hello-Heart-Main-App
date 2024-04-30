// import { View, Text } from "react-native";
// import React from "react";
// import { useUser } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "react-native";
// export default function () {
//   // const { isLoaded, isSignedIn, user } = useUser();
//   // if (!isLoaded || !isSignedIn) {
//   //   return null;
//   // }
//   return (
//     <View
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 9,
//           alignItems: "center",
//         }}
//       >
//         <Image
//           source={{ uri: user.imageUrl }}
//           style={{ width: 45, height: 45, borderRadius: 99 }}
//         />
//         <View>
//           <Text style={{ fontFamily: "appfont" }}>Hello 👋</Text>
//           <Text style={{ fontSize: 18, fontFamily: "appfont-bold" }}>
//             {user.fullName}
//           </Text>
//         </View>
//       </View>
//       <Ionicons name="notifications-outline" size={28} color="black" />
//     </View>
//   );
// }

import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ({ userData }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 9,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/dbvvth5qb/image/upload/v1712678993/822_40834a65bc.jpg",
          }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontFamily: "appfont" }}>Hello 👋</Text>
          <Text style={{ fontSize: 18, fontFamily: "appfont-bold" }}>
            {userData && userData}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Appointment", {
            screen: "Appoinment",
          });
        }}
      >
        <Ionicons name="notifications-outline" size={28} color="black" />
      </Pressable>
    </View>
  );
}
