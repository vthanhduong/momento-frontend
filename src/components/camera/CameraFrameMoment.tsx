import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const CameraFrameUploadMoment = ({
  content,
  photo,
  screenWidth,
  enable = true,
  onContentChange,
}: {
  content?: string;
  photo: string;
  onContentChange?: (text: string) => void;
  screenWidth: number;
  enable?: boolean;
}) => {
  const placeholder = "Thêm một tin nhắn";

  const [width, setWidth] = useState(placeholder.length * 2);
  const translateY = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (content && content.length > 0) {
      setText(content);
    }
  }, [content]);

  useEffect(() => {
    const textLength = text.length > 0 ? text.length : placeholder.length;
    setWidth(Math.max(100, textLength * 8.5)); // Giới hạn chiều rộng tối thiểu
  }, [text]);

  // Dùng useCallback để tránh re-render không cần thiết
  const handleChangeText = (newText: string) => {
    setText(newText);
    onContentChange?.(newText);
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
    <View className="relative">
      <Animated.Image
        source={{ uri: photo }}
        style={{
          width: screenWidth,
          height: screenWidth,
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
          editable={enable}
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
  );
};

export default memo(CameraFrameUploadMoment);
