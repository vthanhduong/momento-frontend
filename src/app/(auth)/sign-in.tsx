import { login } from '@/api/auth';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';
import React, { useReducer } from 'react'
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from "expo-router";
function SignInScreen() {
    const [localState, setLocalState] = useReducer(
        (
            state: {
                username: string;
                password: string;
                loading: boolean
            },
            action: { type: string; payload: any }) => {
            switch (action.type) {
                case 'SET_USERNAME':
                    return { ...state, username: action.payload };
                case 'SET_PASSWORD':
                    return { ...state, password: action.payload };
                case 'SET_LOADING':
                    return { ...state, loading: action.payload };
                default:
                    return state;
            }
        },
        {
            username: '',
            password: '',
            loading: false
        }
    );
    const router = useRouter();
    const { setAuthData } = useAuth();

    const handleInput = (type: string, value: string) => {
        if (type == 'username') {
            setLocalState({ type: 'SET_USERNAME', payload: value })
        }
        else if (type == 'password') {
            setLocalState({ type: 'SET_PASSWORD', payload: value });
        }
    }

    const handleLogin = async () => {
        setLocalState({ type: 'SET_LOADING', payload: true });
        setAuthData({ token: '', username: '', avatar_url: null, gmail: null, loading: true });

        const payload = {
            username: localState.username,
            password: localState.password
        }
        const res = await login(payload);
        setLocalState({ type: 'SET_LOADING', payload: false });
        if (res?.status == 'success') {
            console.log("okela bro", res);
            // set token for AuthProviders
            setAuthData({ token: res.data.token, username: '', avatar_url: null, gmail: null, loading: false });
            router.replace("/");

        }
        else {
            console.log("no okela bro", res);
        }
    }

    return (
        <View className='flex-1 h-full w-full bg-white items-center gap-3 px-10'>
            <TextInput
                label="Username"
                className='w-full bg-white'
                mode='outlined'
                activeOutlineColor='black'
                onChangeText={(text) => handleInput('username', text)}
            />
            <TextInput
                label="Password"
                className='w-full bg-white'
                mode='outlined'
                activeOutlineColor='black'
                onChangeText={(text) => handleInput('password', text)}

            />
            <Button
                mode='contained'
                loading={localState.loading}
                onPress={() => handleLogin()}
            >
                Sign In
            </Button>
        </View>
    )
}


export default SignInScreen