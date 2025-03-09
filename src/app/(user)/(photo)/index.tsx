import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ALargeSmall, Send } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome6";

const SendPhotoScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { photo } = useLocalSearchParams() as { photo: string };
  const screenWidth = Dimensions.get("window").width;
  const squareSize = screenWidth;
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string>("");

  const placeholder = "Thêm một tin nhắn";
  const [width, setWidth] = useState(placeholder.length * 2);
  const translateY = useRef(new Animated.Value(0)).current;

  const data: Array<{ id: number; src?: string; name: string }> = [
    {
      id: 0,
      name: "Mọi người",
    },
    {
      id: 1,
      src: "https://i.pinimg.com/236x/88/9c/e7/889ce794a601c043d55db117b916f340.jpg",
      name: "Mew 1",
    },
    {
      id: 2,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcoZIn7Wq7pKK1W3qlBjZ4095ppAbN7nJUQ&s",
      name: "Meww",
    },
    {
      id: 3,
      src: "https://i.redd.it/agjt3m3kkq181.jpg",
      name: "Meow",
    },
    {
      id: 4,
      src: "https://preview.redd.it/y2d95883f5441.jpg?width=1080&crop=smart&auto=webp&s=63d72262e97b94f04106823e8ca1eee8f0a31647",
      name: "Meww",
    },
    {
      id: 5,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-v9wT-yjaXQBaduzs1_s0gfNRMtZSVNJk4g&s",
      name: "Meow",
    },
  ];

  useEffect(() => {
    const textLength = text.length > 0 ? text.length : placeholder.length;
    setWidth(Math.max(100, textLength * 8.5)); // Giới hạn chiều rộng tối thiểu
  }, [text]);

  // Dùng useCallback để tránh re-render không cần thiết
  const handleChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const backToCamera = () => {
    console.log("Back to camera");
    router.back();
  };

  const onFocus = () => {
    Animated.timing(translateY, {
      toValue: -10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-col space-y-14">
      {loading && (
        <ActivityIndicator size="large" color="#007bff" className="absolute" />
      )}
      {/* Image */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="relative">
          <Animated.Image
            source={{ uri: photo }}
            style={{
              width: squareSize,
              height: squareSize,
              transform: [{ translateY }],
            }}
            className="rounded-[40px]" // Bo tròn 40px
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          <View>
            <TextInput
              placeholder="Thêm một tin nhắn"
              placeholderTextColor={"white"}
              maxLength={31}
              autoCorrect={false}
              spellCheck={false}
              onChangeText={handleChangeText}
              className={`bg-opacity-60 bg-black/50 font-semibold text-white rounded-full bottom-5 left-[50%] p-2 absolute z-[9999999] transition-all`}
              value={text}
              style={{
                width,
                transform: [{ translateX: -(width / 2) }], // Căn giữa bằng cách dịch chuyển
              }}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Upload,Close,Note */}

      <View className="w-full flex-row justify-between items-center px-12 ">
        <TouchableOpacity onPress={backToCamera}>
          <Icon name="xmark" size={35} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary/75 rounded-full flex items-center p-7">
          <Send size={35} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ALargeSmall size={35} color="white" />
        </TouchableOpacity>
      </View>

      {/* User */}
    </View>
  );
};

export default SendPhotoScreen;
