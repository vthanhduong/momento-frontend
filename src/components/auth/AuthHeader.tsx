import React from 'react'
import { Text, View } from 'react-native'

const AuthHeader = (
    { title }: {
        title: string
    }) => {

    return (
        <Text className='text-black'>{title}</Text>
    )
}

export default AuthHeader