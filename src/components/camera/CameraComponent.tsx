import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "front"
  );
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find((device) => device.position === cameraPosition);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);
  // Nếu chưa cấp quyền, hiển thị thông báo
  if (!hasPermission) {
    return <Text>Yêu cầu quyền truy cập camera...</Text>;
  }

  // Nếu không tìm thấy thiết bị camera
  if (!device) {
    return <Text>Không tìm thấy camera phù hợp</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setPhotoUri(`file://${photo.path}`);
    }
  };

  // Đổi camera trước/sau
  const toggleCamera = () => {
    setCameraPosition((prev) => (prev === "back" ? "front" : "back"));
  };

  // Bật/tắt Flash
  const toggleFlash = () => {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <View>
      <Camera
        ref={cameraRef}
        device={device}
        isActive={true}
        photo={true}
        torch={flash}
      />
      {/* Hiển thị ảnh chụp */}
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
        />
      )}

      {/* Nút điều khiển */}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Nút chụp ảnh */}
        <TouchableOpacity
          onPress={takePhoto}
          style={{ backgroundColor: "white", padding: 15, borderRadius: 50 }}
        >
          <Text>📷</Text>
        </TouchableOpacity>

        {/* Nút chuyển đổi camera */}
        <TouchableOpacity
          onPress={toggleCamera}
          style={{ position: "absolute", left: 50, padding: 10 }}
        >
          <Text>🔄</Text>
        </TouchableOpacity>

        {/* Nút bật/tắt flash */}
        <TouchableOpacity
          onPress={toggleFlash}
          style={{ position: "absolute", right: 50, padding: 10 }}
        >
          <Text>{flash === "off" ? "⚡" : "💡"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
