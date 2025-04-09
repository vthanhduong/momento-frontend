import "react-native-reanimated";
import "react-native-gesture-handler";
import "tailwindcss/tailwind.css";
import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { Text, View } from "react-native";
import Header from "@/components/layouts/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthProvider from "@/providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
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
            <Toast
              position="top"
              visibilityTime={1000}
              topOffset={50}
              config={{
                success: ({ text1, text2 }) => (
                  <View style={{ backgroundColor: '#CCFF99', padding: 12, borderRadius: 8 }}>
                    <Text style={{ color: 'black' }}>{text1}</Text>
                    {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
                  </View>
                ),
                error: ({ text1, text2 }) => (
                  <View style={{ backgroundColor: '#ef4444', padding: 12, borderRadius: 8 }}>
                    <Text style={{ color: 'white' }}>{text1}</Text>
                    {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
                  </View>
                ),
              }}
            />
          </AuthProvider>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function ThemedLayout() {
  const pathname = usePathname();
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
