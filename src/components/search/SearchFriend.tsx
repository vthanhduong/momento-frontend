import { View, Text, TextInput, FlatList } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import FriendItems from '../friend/FriendItems'


const userData = [
    {
        id: '1',
        name: 'Quang Dieu',
        avatar: "https://i.pinimg.com/236x/4e/f3/2b/4ef32b0950f39d073efc823c569a0815.jpg"
    },
    {
        id: '2',
        name: 'Thanh Truc',
        avatar: "https://i.pinimg.com/236x/4e/f3/2b/4ef32b0950f39d073efc823c569a0815.jpg"
    },
    {
        id: '3',
        name: 'Second wife',
        avatar: "https://i.pinimg.com/236x/4e/f3/2b/4ef32b0950f39d073efc823c569a0815.jpg"
    },
];


const SearchFriend = () => {
    
    return (
        <>
            <View className='w-full flex items-center justify-center gap-4'>
                <View className='w-full flex flex-row h-12 justify-center items-center bg-neutral-600 rounded-2xl'>
                    <FontAwesome6Icon
                        name='magnifying-glass'
                        size={20}
                        color={"white"}
                    />
                    <Text className='text-white text-sm font-semibold ml-3'>Add a new friend</Text>
                </View>
               
                <View className='w-full flex flex-row gap-3 items-center'>
                    <FontAwesome6Icon
                        name='user-group'
                        size={25}
                        color={"white"}
                    />
                    <Text className='text-white text-sm font-semibold'>Your friend</Text>
                </View>
                <View className='w-full pt-2'>
                    <FlatList 
                        data={userData}
                        renderItem={({ item }) => <FriendItems name={item.name} avatar={item.avatar} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </>
    )
}

export default SearchFriend