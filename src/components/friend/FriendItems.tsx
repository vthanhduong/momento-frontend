import { View, Text, Image } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'

const defaultImg = require('../../../assets/images/avatar-default.png')
const FriendItems = ({ name, avatar }: { name: string, avatar: string }) => {

    return (
        <View className='w-full flex flex-row items-center justify-between px-3 my-2'>
            <View className='w-fit flex flex-row items-center gap-3'>
                <Image
                    className="w-14 h-14 rounded-full border-2 border-primary"
                    source={{
                        uri: avatar,
                    }}
                />
                <Text className='text-white text-lg font-semibold'>{name}</Text>
            </View>
            <FontAwesome6Icon
                name='xmark'
                size={25}
                color={"white"}
            />
        </View>
    )
}

export default FriendItems