import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ShareItemComponent = ({ item, onPress, isSelected }: ShareItemProps) => {
  return (
    <TouchableOpacity
      className={`flex-col space-y-3 mr-4 items-center h-[80px]`}
      onPress={onPress}
    >
      <Image
        source={
          item.src
            ? { uri: item.src }
            : require("@assets/images/avatar-default.png")
        }
        className={`border-[2px] rounded-full ${
          isSelected ? "border-primary w-10 h-10" : "border-neutral-400 w-8 h-8"
        }`}
      />
      <Text
        className={`w-full font-semibold ${
          isSelected ? "text-primary" : "text-neutral-400"
        }`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ShareItemComponent);
