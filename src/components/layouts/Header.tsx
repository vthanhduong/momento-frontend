import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { textHehe } from "@/globalStyle";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useRef } from "react";
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchFriend from "../search/SearchFriend";

const Header = () => {
  const refFriendSheet = useRef<any>(null);
  return (
    <>
      <View className="w-full max-h-20 flex items-center justify-between flex-row p-4">
        <Image
          className="w-12 h-12 rounded-full border-2 border-primary"
          source={{
            uri: "https://i.pinimg.com/236x/4e/f3/2b/4ef32b0950f39d073efc823c569a0815.jpg",
          }}
        />
        <View className="max-h-12">
          <Pressable
            className="w-fit h-full items-center justify-center bg-opacity-80 bg-neutral-600 rounded-full flex flex-row space-x-1 p-2"
            onPress={() => refFriendSheet.current.open()}
          >
            <Icon name="user-group" size={16} color="white" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-base font-bold text-white max-w-[200px] leading-relaxed tracking-wide"
            >
              17 người bạn
            </Text>
          </Pressable>

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
        <RBSheet
          ref={refFriendSheet}
          draggable={true}
          customStyles={{
            container: styles.bgSheeet
          }}
        >
          <View
            className="w-full h-full flex-1 items-center py-5"
          >
            <Text className="text-white text-lg font-semibold mx-10">Invite a friend to continue</Text>
            <View className="px-5 w-full mt-5 flex items-center">
              <SearchFriend />
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgSheeet: {
    backgroundColor: "#202020",
    height: "90%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
})


export default Header;
