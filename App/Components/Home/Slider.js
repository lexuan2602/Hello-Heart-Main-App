import { View, Text, FlatList, Dimensions, Image } from "react-native";
import React, { useEffect } from "react";
import GlobalApi from "../../Services/GlobalApi";
import { useState } from "react";
export default function Slider() {
  const [sliderList, setSliderList] = useState();
  // const sliderList = [
  //   {
  //     id: 1,
  //     name: "Slider 1",
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/realistic-background-world-heart-day-awareness_23-2150637352.jpg?w=1060&t=st=1711725516~exp=1711726116~hmac=aa506ce5242cdc801734eb3d32b03eb74bcb42d46c30a02b6406c51a1ccc724d",
  //   },
  //   {
  //     id: 2,
  //     name: "Slider 2",
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/flat-horizontal-banner-template-world-heart-day-awareness_23-2150628711.jpg?w=1060&t=st=1711725646~exp=1711726246~hmac=cf99e70322a471eed84e65e971e7cc0255c4cd59e4c32bc19ccf2276cd74f692",
  //   },
  // ];
  useEffect(() => {
    getSlider();
  }, []);
  const getSlider = () => {
    GlobalApi.getSlider().then((resp) => {
      console.log("slider");
      console.log(resp.data.data[0].attributes.Image.attributes);
      setSliderList(resp.data.data);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.attributes.Image.data[0].attributes.url }}
            style={{
              width: Dimensions.get("screen").width * 0.9,
              height: 170,
              borderRadius: 10,
              margin: 2,
            }}
          />
        )}
      />
      {/* <Text>Slider</Text> */}
    </View>
  );
}
