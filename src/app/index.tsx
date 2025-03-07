import CameraComponent from "@/components/camera/CameraComponent";
import { useAuth } from "@/providers/AuthProvider";
import { useCameraPermissions } from "expo-camera";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
  const { token } = useAuth();

  //Quyền truy cập camera
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && permission.status === "undetermined") {
      requestPermission();
    }
  }, [permission]);

  if (token == "") {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <View className="h-full py-4">
      <CameraComponent />
    </View>
  );
};

export default HomeScreen;
