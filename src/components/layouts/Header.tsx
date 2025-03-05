import { Text, View } from "react-native";
import { textHehe } from "@/globalStyle";
const Header = () => {
  return (
    <>
      <View className="h-16 bg-blue-500 items-center justify-center">
        <Text className={textHehe}>Header</Text>
      </View>
    </>
  );
};

export default Header;
