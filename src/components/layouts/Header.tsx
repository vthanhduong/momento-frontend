import { Image, Text, View } from "react-native";
import { textHehe } from "@/globalStyle";
import Icon from "react-native-vector-icons/FontAwesome6";

const Header = () => {
  return (
    <>
      <View className="w-full max-h-20 items-center justify-between flex-row p-4">
        <Image
          className="w-12 h-12 rounded-full border-2 border-primary"
          source={{
            uri: "https://i.pinimg.com/236x/4e/f3/2b/4ef32b0950f39d073efc823c569a0815.jpg",
          }}
        />
        <View className="w-fit max-h-12 items-center justify-center bg-opacity-80 bg-neutral-600 rounded-full flex flex-row gap-1 p-2">
          <Icon name="user-group" size={16} color="white" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-base font-bold text-white max-w-[200px] leading-relaxed tracking-wide"
          >
            17 người bạn
          </Text>
        </View>
        <View className="w-fit items-center bg-opacity-80 bg-neutral-600 rounded-full flex p-2 relative">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-4 h-4 absolute right-0 bg-primary -top-[6px] text-black text-center rounded-full"
          >
            1
          </Text>
          <Icon name="comment" size={24} color="white" />
        </View>
      </View>
    </>
  );
};

export default Header;
