import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import GlobalApi from "../../Services/GlobalApi";
import Colors from "../../../assets/Shared/Colors";
import { useState } from "react";
// import { FlatList } from "react-native";
export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      // console.log(resp.data.data);
      setCategoryList(resp.data.data);
    });
  };
  if (!categoryList) {
    return null;
  }
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "appfont-semi",
            fontWeight: "800",
            marginBottom: 16,
          }}
        >
          Heart Radio
        </Text>
        {/* <Text style={{ fontFamily: "appfont-semi", color: Colors.PRIMARY }}>
          See All
        </Text> */}
      </View>
      <FlatList
        data={categoryList}
        numColumns={4}
        style={{ marginTop: 5 }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={{
                  uri: item.attributes.Icon.data[0].attributes.url,
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>{item.attributes.Name}</Text>
          </View>
        )}
      />
      {/* <FlatList
        data={categoryList}
        numColumns={4}
        style={{ marginTop: 5 }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <View>
            <Text>{item.attributes.Name}</Text>
            <FlatList
              data={item.attributes.Icon.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(imageItem) => imageItem.id.toString()}
              renderItem={({ imageItem }) => (
                <Image
                  source={{ uri: imageItem.attributes.url }}
                  style={{ width: 30, height: 30, margin: 5 }}
                />
              )}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );
}
