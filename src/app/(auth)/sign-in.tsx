import React, { useReducer } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import AuthButton from '@/components/auth/AuthButton';
function SignInScreen() {
    const [localState, setLocalState] = useReducer(
        (
            state: {
                username: string;
                password: string;
            },
            action: { type: string; payload: any }) => {
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
            password: '',
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
                <TextInput
                    placeholder="Password"
                    className='w-full h-16 bg-black p-3 border border-b-gray-800 text-white text-base'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => handleInput('password', text)}
                    numberOfLines={1}
                    maxLength={50}
                    secureTextEntry
                />
                <View className='w-full flex items-end my-5'>
                    <Text className='text-sm text-secondary'>Forgot Password?</Text>
                </View>
                <View className='w-full flex'>
                    <AuthButton
                        type='Login'
                        authPayload={{ username: localState.username, password: localState.password }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default SignInScreen