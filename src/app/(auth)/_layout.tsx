import AuthHeader from "@/components/auth/AuthHeader";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
    const pathname = usePathname();
    const title = pathname === '/sign-in' ? 'Sign In' : 'Sign Up';

    return (
        <>
            <View className="flex-1">
                <View className="flex-[0.3] bg-blue-300">
                    <AuthHeader title={title} />
                </View>
                <View className="flex-[0.7] bg-green-300">
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
                        <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
                    </Stack>
                </View>
            </View>
        </>
    );
}