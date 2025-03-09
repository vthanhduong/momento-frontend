import HeaderSavePhoto from "@/components/layouts/HeaderSavePhoto";
import { Stack } from "expo-router";
import React from "react";

const PhotoStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <HeaderSavePhoto />,
        }}
      />
    </Stack>
  );
};

export default PhotoStack;
