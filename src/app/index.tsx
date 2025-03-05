import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

const HomeScreen = () => {
  const { token } = useAuth();

  if(token == ''){
    return <Redirect href={'/sign-in'} />
  }


  return (
    <View className="h-screen items-center justify-center">
      <Text>Hello Friend</Text>
    </View>
  );
};

export default HomeScreen;
