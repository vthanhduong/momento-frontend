import "react-native-reanimated";
import "react-native-gesture-handler";
import "tailwindcss/tailwind.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useColorScheme } from "@hooks/useColorScheme";
import { View } from "react-native";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthProvider from "@/providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <SafeAreaView className="h-full">
          <AuthProvider>
            <ThemedLayout />
          </AuthProvider>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function ThemedLayout() {
  const pathname = usePathname();
  const authpath = ["/sign-in", "/sign-up"];
  const isAuthPage = authpath.includes(pathname);
  console.log(pathname);
  return (
    <View className="flex flex-col h-full ">
      <View className="flex-1">
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ headerShown: true, header: () => <Header /> }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </View>
  );
}
