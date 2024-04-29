import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
export default function RadioVideo() {
  const navigation = useNavigation();
  const video = useRoute().params.courseContent;
  const [videoChapter, setVideoChapter] = useState([]);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  return (
    <View style={{ padding: 20, marginTop: 25 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 10 }}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      {videoChapter ? (
        <View>
          <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "bold" }}>
            {video.Description}
          </Text>
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={video?.Link}
            onChangeState={onStateChange}
          />
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Description
          </Text>
          <Text style={{ lineHeight: 20 }}>{video?.Description}</Text>
        </View>
      ) : null}
    </View>
  );
}
