import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@hooks/useColorScheme";
import { View } from "react-native";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import "tailwindcss/tailwind.css";
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
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView className="flex-1">
        <ThemedLayout />
      </SafeAreaView>
    </ThemeProvider>
  );
}

function ThemedLayout() {
  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1">
        <StatusBar style="auto" />

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
      <Footer />
    </View>
  );
}
