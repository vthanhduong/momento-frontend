import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { Download } from "lucide-react-native";
const HeaderSavePhoto = () => {
  const { photo } = useLocalSearchParams() as { photo: string };
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const savePhoto = async (photoUri: string) => {
    if (permission && permission.status === "undetermined") {
      requestPermission();
    }
    if (permission && permission.status === "granted") {
      try {
        setLoading(true);
        const asset = await MediaLibrary.createAssetAsync(photoUri);
        if (Platform.OS === "ios") {
          await MediaLibrary.createAlbumAsync("Photos", asset, false);
        } else {
          await MediaLibrary.createAlbumAsync("DCIM", asset, false);
        }
        Alert.alert("Thành công!", "Ảnh của bạn đã được lưu vào thư viện ảnh.");
      } catch (e) {
        console.error("Lỗi khi lưu ảnh: ", e);
        Alert.alert("Lỗi", "Không thể lưu ảnh");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View className="flex-row h-20 max-h-20 w-full p-4 justify-between  items-center">
      <View></View>
      <Text className="text-xl text-white font-semibold ">Gửi đến...</Text>
      <TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Download size={24} color="white" onPress={() => savePhoto(photo)} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSavePhoto;
