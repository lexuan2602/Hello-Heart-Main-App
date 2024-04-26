import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Services/GlobalApi";
import { FlatList } from "react-native";
import { Image } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Categories from "./Categories";

export default function HeartRadio() {
  const [radioList, setRadioList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getHeartRadio();
  }, []);

  const getHeartRadio = async () => {
    const resp = (await GlobalApi.getHeartRadio()).data.data;
    // console.log("Herart Radio");
    // console.log(resp);
    const result = resp.map((item) => ({
      id: item.id,
      RadioName: item.attributes.RadioName,
      Category: item.attributes.Category.data.attributes.Name,
      description: item.attributes.RadioDescription,
      YoutubeList: item.attributes.YoutubeVideo,
      image: item.attributes.RadioThumbnail.data.attributes.formats.large.url,
    }));
    console.log("intems");
    console.log(result);
    setRadioList(result);
  };
  // const courseList = [
  //   {
  //     id: 1,
  //     name: "Yoga for heart 1",
  //     image:
  //       "https://res.cloudinary.com/dbvvth5qb/image/upload/v1712684863/14324292187471101089_8e0dccadb9.jpg",
  //     Topic: {
  //       id: 1,
  //       name: "Yoga 1",
  //       Link: "https://www.youtube.com/watch?v=XBaisoFIa98&list=PLaBeGKL1tOU0FuOxkLHFy_zOlIqOWUcNc&index=10",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Yoga for heart 2",
  //     image:
  //       "https://res.cloudinary.com/dbvvth5qb/image/upload/v1712715260/205184201739964861_f54af7b271.jpg",
  //     Topic: {
  //       id: 1,
  //       name: "Yoga 1",
  //       Link: "https://www.youtube.com/watch?v=XBaisoFIa98&list=PLaBeGKL1tOU0FuOxkLHFy_zOlIqOWUcNc&index=10",
  //     },
  //   },
  // ];
  const onPressCourse = (course) => {
    navigation.navigate("Radio-detail", {
      courseData: course,
    });
    // navigation.navigate("Radio-detail");
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: 3,
        }}
      >
        {/* {type} Course */}
        Advancea
      </Text>

      <FlatList
        data={radioList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginRight: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => onPressCourse(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 120,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                resizeMode: "cover",
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.RadioName}
              </Text>
              <Text style={{ color: Colors.gray, fontWeight: "300" }}>
                {item.YoutubeList?.length} videos
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
