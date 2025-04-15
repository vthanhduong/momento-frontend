import AuthButton from '@/components/auth/AuthButton';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import React, { useEffect, useReducer } from 'react'
import { Keyboard, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

function SignUpScreen() {
    const router = useRouter();
    const { authData, clearError } = useAuth();
    const [localState, setLocalState] = useReducer(
        (
            state: {
                username: string,
                password: string,
                error: any
            },
            action: { type: string, payload: any }
        ) => {
            switch (action.type) {
                case 'SET_USERNAME':
                    return { ...state, username: action.payload };
                case 'SET_PASSWORD':
                    return { ...state, password: action.payload };
                case 'SET_ERROR':
                    return { ...state, error: action.payload };
                default:
                    return state;
            }
        },
        {
            username: '',
            password: '',
            error: null
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


    useEffect(() => {
        if (authData.error != null) {
            setLocalState({ type: 'SET_ERROR', payload: authData.error })
            console.log("Error em oi", authData.error);
            clearError();
            setTimeout(() => {
                setLocalState({ type: 'SET_ERROR', payload: null })
            }, 2000);
        }
    }, [authData.error])

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
                {
                    <Text className='w-full text-red-500 px-3'>{localState.error?.username}</Text>
                }
                <TextInput
                    placeholder="Password"
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    numberOfLines={1}
                    maxLength={50}
                    secureTextEntry
                    onChangeText={(text) => handleInput('password', text)}
                />
                {
                    <Text className='w-full text-red-500 px-3'>{localState.error?.password}</Text>
                }
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