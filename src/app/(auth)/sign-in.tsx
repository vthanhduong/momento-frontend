import React, { useEffect, useReducer } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import AuthButton from '@/components/auth/AuthButton';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
function SignInScreen() {
    const router = useRouter();
    const { authData, clearError } = useAuth();
    const [localState, setLocalState] = useReducer(
        (
            state: {
                username: string;
                password: string;
                error: any
            },
            action: { type: string; payload: any }
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
    );

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
            <View className='flex-1 h-full w-full items-center justify-center gap-3 px-10'>
                <View>
                    <FontAwesome6Icon name='github' size={50} color={'white'} />
                </View>
                <View className='flex flex-row gap-3'>
                    <View className='w-40 flex flex-row items-center justify-center bg-white rounded-lg py-2'>
                        <FontAwesome6Icon name='google' size={30} color={'#1C6FEC'} />
                        <Text className='text-base ml-3'>Google</Text>
                    </View>
                    <View className='w-40 flex flex-row items-center justify-center bg-white rounded-lg py-2'>
                        <FontAwesome6Icon name='github' size={30} color={'#5E438F'} />
                        <Text className='text-base ml-3'>Github</Text>
                    </View>

                </View>
                <View className='flex'>
                    <Text className='text-lg text-gray-400'>or</Text>
                </View>
                <TextInput
                    placeholder="Username"
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => handleInput('username', text)}
                    numberOfLines={1}
                    maxLength={50}

                />
                {
                    <Text className='w-full text-red-500 px-3'>{localState.error?.username}</Text>
                }
                <TextInput
                    placeholder="Password"
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => handleInput('password', text)}
                    numberOfLines={1}
                    maxLength={50}
                    secureTextEntry
                />
                {
                    <Text className='w-full text-red-500 px-3'>{localState.error?.password}</Text>
                }
                <View className='w-full flex items-end my-5'>
                    <Text className='text-sm text-secondary'>Forgot Password?</Text>
                </View>
                <View className='w-full'>
                    <AuthButton
                        type='Login'
                        authPayload={{ username: localState.username, password: localState.password }} />
                </View>
                <View className='w-full flex flex-row items-center justify-center gap-2'>
                    <Text className='text-sm text-white'>Don't have an account?</Text>
                    <Text
                        className='text-sm text-secondary'
                        onPress={() => router.replace("/(auth)/sign-up")}
                    >
                        Register Now
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default SignInScreen