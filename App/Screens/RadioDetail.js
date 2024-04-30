import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/Shared/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import RadioContent from "../Components/Home/RadioContent";
import { ScrollView } from "react-native";
export default function RadioDetail() {
  const course = useRoute().params.courseData;
  const navigation = useNavigation();
  // const [userProgress, setUserProgress] = useState([]);
  // useEffect(() => {
  //   setCourse(param?.courseData);
  //   param.courseData.id ? getCourseProgress() : null;
  // }, [param.courseContentId]);
  console.log("test");
  console.log(course.YoutubeList);
  // console.log(courseData.YoutubeList);
  return (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="#fc8181" />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: "900" }}>
          {course.RadioName}
        </Text>
        {/* <Text style={{ color: Colors.gray }}>By Tubeguruji</Text> */}
        <Image
          source={{ uri: course.image }}
          style={{ height: 200, marginTop: 10, borderRadius: 10 }}
        />
        <Text style={{ marginTop: 16, fontSize: 20, fontWeight: "bold" }}>
          About This Radio
        </Text>
        <Text
          numberOfLines={4}
          style={{ color: "#757575", marginTop: 6, fontSize: 16 }}
        >
          {/* {course.description} */}
          Experience tranquility and boost your heart health with our yoga heart
          videos! Our carefully curated sessions combine gentle yoga poses, deep
          breathing exercises, and relaxation techniques to help you unwind and
          strengthen your heart.
        </Text>
      </View>
      <View>
        <RadioContent Videos={course.YoutubeList} />
      </View>
    </ScrollView>
  );
}
