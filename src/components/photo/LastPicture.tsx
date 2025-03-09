import { Link } from "expo-router";
import React, { useEffect, useReducer } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
// import Carousel from "react-native-reanimated-carousel";
const LastPicture = () => {
  //   const [localState, setLocalState] = useReducer(
  //     (
  //       state: {
  //         loading: boolean;
  //         pictures: Array<string>;
  //       },
  //       action: { type: string; payload: any }
  //     ) => {
  //       switch (action.type) {
  //         case "SET_PICTURE":
  //           return { ...state, picture: action.payload };
  //         default:
  //           return state;
  //       }
  //     },
  //     {
  //       loading: true,
  //       picture: [],
  //     }
  //   );

  //   useEffect(() => {
  //     const getPicture = async () => {
  //       setLocalState({
  //         type: "SET_PICTURE",
  //         payload:
  //           "https://i.pinimg.com/236x/88/9c/e7/889ce794a601c043d55db117b916f340.jpg",
  //       });
  //     };

  //     getPicture();
  //   }, []);

  const data = [
    {
      id: 1,
      src: "https://i.pinimg.com/236x/88/9c/e7/889ce794a601c043d55db117b916f340.jpg",
    },
    {
      id: 2,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcoZIn7Wq7pKK1W3qlBjZ4095ppAbN7nJUQ&s",
    },
    {
      id: 3,
      src: "https://i.redd.it/agjt3m3kkq181.jpg",
    },
    {
      id: 4,
      src: "https://preview.redd.it/y2d95883f5441.jpg?width=1080&crop=smart&auto=webp&s=63d72262e97b94f04106823e8ca1eee8f0a31647",
    },
    {
      id: 5,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-v9wT-yjaXQBaduzs1_s0gfNRMtZSVNJk4g&s",
    },
  ];

  return (
    <Link href={"/(user)/(galleries)/index"}>
      <View className="h-fit flex-col justify-center items-center">
        <View className=" flex-row flex-wrap justify-center items-center space-x-2">
          <Carousel
            loop
            width={30}
            height={30}
            autoPlay={true}
            autoPlayInterval={3000}
            data={data}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item.src }}
                  style={{ width: 30, height: 30 }}
                  className="rounded-lg"
                />
              </View>
            )}
          />

          <Text className="text-center text-white text-lg font-semibold">
            Lịch sử
          </Text>
        </View>
        <FontAwesome6Icon name="angle-down" size={30} color={"white"} />
      </View>
    </Link>
  );
};

export default LastPicture;
