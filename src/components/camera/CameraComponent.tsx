import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
  CameraMode,
} from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Link, useNavigation, useRouter } from "expo-router";

import HeaderSavePhoto from "../layouts/HeaderSavePhoto";
import ButtonGroupDashboard from "../button/ButtonGroupDashboard";
import LastPicture from "../photo/LastPicture";
import CameraFrameMoment from "./CameraFrameMoment";
import ButtonGroupUploadMoment from "../button/ButtonGroupUploadMoment";
import Header from "../layouts/Header";

export default function CameraComponent() {
  const navigation = useNavigation();

  //permission camera
  const [permission, requestPermission] = useCameraPermissions();
  const squareSize = Dimensions.get("window").width; // Lấy chiều rộng màn hình

  //mode camera
  const [facing, setFacing] = useState<CameraType>("front");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [mode, setMode] = useState<CameraMode>("picture");
  const cameraRef = useRef<CameraView>(null);
  const [picture, setPicture] = useState<string | null>(null);

  //set content and upload if picture exist
  const [content, setContent] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onContentChange = useCallback((text: string) => {
    setContent(text);
  }, []);

  const onSelectionChange = useCallback((ids: Array<string>) => {
    setSelectedIds(ids);
  }, []);

  //functions of camera
  const toggleFacing = useCallback((): void => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  }, []);

  const toggleFlash = useCallback((): void => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }, []);

  const toggleMode = useCallback((): void => {
    setMode((current) => (current === "picture" ? "video" : "picture"));
  }, []);

  const takePicture = useCallback(async (): Promise<void> => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPicture(photo.uri);
        navigation.setOptions({
          header: () => <HeaderSavePhoto photo={photo.uri} />,
        });
      }
    }
  }, []);

  const cancelPicture = useCallback((): void => {
    setPicture(null);
    navigation.setOptions({
      header: () => <Header />,
    });
  }, []);

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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full">
              <CameraFrameMoment
                photo={picture}
                screenWidth={squareSize}
                content={content}
                onContentChange={onContentChange}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* Button group camera */}
      {!picture ? (
        <View className="w-full">
          <ButtonGroupDashboard
            flash={flash}
            toggleFlash={toggleFlash}
            toggleFacing={toggleFacing}
            takePicture={takePicture}
          />
        </View>
      ) : (
        <View className="w-full">
          <ButtonGroupUploadMoment
            screenWidth={squareSize}
            cancelPicture={cancelPicture}
            selectedIds={selectedIds}
            onSelectedIdsChange={onSelectionChange}
          />
        </View>
      )}
    </View>
  );
}
