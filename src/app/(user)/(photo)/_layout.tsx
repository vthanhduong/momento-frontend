import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const PhotoStack = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity>
            <FontAwesome6Icon name="save" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Gửi đến..." }} />
    </Stack>
  );
};

export default PhotoStack;
