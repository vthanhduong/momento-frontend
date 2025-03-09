import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Button,
  Dimensions,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
  CameraMode,
} from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Link } from "expo-router";
import LastPicture from "../photo/LastPicture";

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const screenWidth = Dimensions.get("window").width; // Lấy chiều rộng màn hình
  const squareSize = screenWidth;
  const [facing, setFacing] = useState<CameraType>("front");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [mode, setMode] = useState<CameraMode>("picture");
  const cameraRef = useRef<CameraView>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const toggleFacing = () => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  const toggleMode = () => {
    setMode((current) => (current === "picture" ? "video" : "picture"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPicture(photo.uri);
      }
    }
  };

  const cancelPicture = () => {
    setPicture(null);
  };

  return (
    <View className="flex-col space-y-10">
      <View>
        {!picture ? (
          <CameraView
            style={{ width: squareSize, height: squareSize }}
            className="rounded-[40px] overflow-hidden"
            facing={facing}
            flash={flash}
            mode={mode}
            ratio="1:1"
            pictureSize={`${squareSize}x${squareSize}`}
            ref={cameraRef}
            mirror={true}
          ></CameraView>
        ) : (
          <Image
            source={{ uri: picture }}
            style={{ width: squareSize, height: squareSize }}
            className="rounded-[40px]" // Bo tròn 40px
          />
        )}
      </View>
      <View className=" w-full flex-row justify-between items-center px-14 ">
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
      <View className="w-full flex-row justify-center items-center">
        <LastPicture />
      </View>
    </View>
  );
}
