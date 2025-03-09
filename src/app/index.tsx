import CameraComponent from "@/components/camera/CameraComponent";
import { useAuth } from "@/providers/AuthProvider";
import { useCameraPermissions } from "expo-camera";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
  // const { authData } = useAuth();

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && permission.status === "undetermined") {
      requestPermission();
    }
  }, [permission]);

  // if (authData.token == "") {
  //   console.log("login state", authData.token);
  //   return <Redirect href={"/sign-in"} />;
  // }

  return (
    <View className="flex-1 py-4">
      <CameraComponent />
    </View>
  );
};

export default HomeScreen;
