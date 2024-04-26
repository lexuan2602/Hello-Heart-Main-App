import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/Shared/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import RadioContent from "../Components/Home/RadioContent";
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
    <View style={{ padding: 20, paddingTop: 50 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {course.RadioName}
        </Text>
        {/* <Text style={{ color: Colors.gray }}>By Tubeguruji</Text> */}
        <Image
          source={{ uri: course.image }}
          style={{ height: 150, marginTop: 10, borderRadius: 10 }}
        />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
          About This Radio
        </Text>
        <Text numberOfLines={4} style={{ color: Colors.gray }}>
          {course.description}
        </Text>
      </View>
      <RadioContent Videos={course.YoutubeList} />
    </View>
  );
}
