import AuthHeader from "@/components/auth/AuthHeader";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
    const pathname = usePathname();
    const title = pathname === '/sign-in' ? 'Sign In' : 'Sign Up';

    return (
        <>
            <View className="flex-1">
                <View className="flex-1 bg-black">
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="sign-in"
                            options={{ title: "Sign In", animation: 'slide_from_left' }}
                        />
                        <Stack.Screen
                            name="sign-up"
                            options={{ title: "Sign Up" }}
                        />
                    </Stack>
                </View>
            </View>
        </>
    );
}