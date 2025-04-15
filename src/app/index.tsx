import CameraComponent from "@/components/camera/CameraComponent";
import { useAuth } from "@/providers/AuthProvider";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const HomeScreen = () => {
  const { authData, handleRefreshToken } = useAuth();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, [])
  useEffect(() => {
    if (permission && permission.status === "undetermined") {
      requestPermission();
    }
  }, [permission]);

  // refresh token
  useEffect(() => {
    if (authData.token == "") {
      handleRefreshToken();
    }
  }, [authData.token]);
  useEffect(() => {
    if (isMounted) {
      if (!authData.token && !authData.loading) {
        router.replace("/(auth)/sign-in");
      }
      if (!authData.loading) {
        setIsLoading(false);
      }
    }
  }, [authData, isMounted]);


  return isLoading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={"large"} />
    </View>
  ) :
    (
      <View className="flex-1 py-4">
        <CameraComponent />
      </View >
    );
};

export default HomeScreen;
