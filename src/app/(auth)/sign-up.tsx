import AuthButton from '@/components/auth/AuthButton';
import { useRouter } from 'expo-router';
import React, { useReducer } from 'react'
import { Keyboard, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

function SignUpScreen() {
    const router = useRouter();
    const [localState, setLocalState] = useReducer(
        (
            state: {
                username: string,
                password: string
            },
            action: { type: string, payload: any }
        ) => {
            switch (action.type) {
                case 'SET_USERNAME':
                    return { ...state, username: action.payload };
                case 'SET_PASSWORD':
                    return { ...state, password: action.payload };
                default:
                    return state;
            }
        },
        {
            username: '',
            password: ''
        }
    )
    const handleInput = (type: string, value: string) => {
        if (type == 'username') {
            setLocalState({ type: 'SET_USERNAME', payload: value })
        }
        else if (type == 'password') {
            setLocalState({ type: 'SET_PASSWORD', payload: value });
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className='flex-1 h-full w-full gap-3 px-10 pt-8'>
                <View>
                    <FontAwesome6Icon onPress={() => router.replace('/(auth)/sign-in')} name='chevron-left' size={30} color={'white'} />
                </View>
                <Text className='text-white text-2xl font-bold pt-8'>Register to Momento</Text>
                <TextInput
                    placeholder='Username'
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    numberOfLines={1}
                    maxLength={50}
                    onChangeText={(text) => handleInput('username', text)}
                />
                <TextInput
                    placeholder="Password"
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    numberOfLines={1}
                    maxLength={50}
                    secureTextEntry
                    onChangeText={(text) => handleInput('password', text)}
                />
                <View className='w-full pt-8'>
                    <AuthButton
                        type='Register'
                        authPayload={{ username: localState.username, password: localState.password }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen