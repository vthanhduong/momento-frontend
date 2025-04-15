import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import LastPicture from "../photo/LastPicture";

const ButtonGroupDashboard = ({
  toggleFlash,
  flash,
  takePicture,
  toggleFacing,
}: {
  toggleFlash: () => void;
  flash: String;
  takePicture: () => Promise<void>;
  toggleFacing: () => void;
}) => {
  return (
    <>
      <View className=" w-full flex-row justify-between items-center px-14">
        <TouchableOpacity onPress={toggleFlash}>
          <Icon
            name="bolt"
            size={35}
            color={flash === "on" ? "yellow" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-primary rounded-full p-1"
          onPress={takePicture}
        >
          <Text className="w-20 h-20 bg-white rounded-full border-[4px] border-black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFacing}>
          <Icon name="rotate" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <View className="w-full flex-row justify-center items-center mt-10">
        <LastPicture />
      </View>
    </>
  );
};

export default memo(ButtonGroupDashboard);
