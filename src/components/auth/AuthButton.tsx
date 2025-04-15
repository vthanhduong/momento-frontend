import { login, register } from "@/api/auth"
import { useAuth } from "@/providers/AuthProvider"
import { Button, color } from "@rneui/base"
import { useRouter } from "expo-router"
import { useReducer, useState } from "react"
import { StyleSheet, View } from "react-native"
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginPayload = {
    username: string,
    password: string
}

type SignUpPayload = {
    username: string,
    password: string
}

const AuthButton = ({
    type, authPayload
}:
    {
        type: string,
        authPayload: LoginPayload | SignUpPayload
    }) => {

    const router = useRouter();
    const { authData, setAuthData } = useAuth();
    const [buttonState, setButtonState] = useReducer(
        (
            state: {
                loading: boolean,
                bgColor: string,
                txtColor: string,
            },
            action: { type: string; payload: any }) => {
            switch (action.type) {
                case 'SET_LOADING':
                    return { ...state, loading: action.payload };
                case 'SET_BGCOLOR':
                    return { ...state, bgColor: action.payload };
                case 'SET_TXTCOLOR':
                    return { ...state, txtColor: action.payload };
                default:
                    return state;
            }
        },
        {
            loading: false,
            bgColor: '#181B24',
            txtColor: 'white'
        }
    );


    const handleLogin = async () => {
        setButtonState({ type: 'SET_LOADING', payload: true });
        setAuthData({ token: '', nickname: '', avatar: null, error: null, loading: true });
        const payload = {
            username: authPayload.username.trim(),
            password: authPayload.password.trim()
        }
        console.log("Hello", payload);

        const res = await login(payload);
        if (res?.status == 'authorized') {
            console.log("okela bro", res);
            // Save token in AuthProvider and AsyncStorage
            setAuthData({
                token: res?.data?.token,
                nickname: res?.data?.nickname,
                avatar: res?.data?.avatar,
                error: null,
                loading: false
            });
            await AsyncStorage.setItem('authToken', res?.data?.token);

            Toast.show({
                type: 'success',
                text1: 'Welcome to momento'
            })
            router.replace("/");
        }
        else {
            console.log("no okela bro", res);
            if (res?.status == 401) {
                Toast.show({
                    type: 'error',
                    text1: res?.message
                })
            }
            else {
                const usernameError = res.errors.find((err: any) => err.path == "username");
                const passwordError = res.errors.find((err: any) => err.path == "password");
                setAuthData({
                    ...authData,
                    error: {
                        username: usernameError?.msg || '',
                        password: passwordError?.msg || '',
                    }
                })
            }
        }
        setButtonState({ type: 'SET_LOADING', payload: false });
    }

    const handleSignUp = async () => {
        setButtonState({ type: 'SET_LOADING', payload: true });
        setAuthData({ token: '', nickname: '', avatar: null, error: null, loading: true });
        const payload = {
            username: authPayload.username.trim(),
            password: authPayload.password.trim()
        }
        console.log("Hello", payload);

        const res = await register(payload);
        if (res?.status == 'success') {
            console.log("okela bro", res);
            Toast.show({
                type: 'success',
                text1: 'Your account has been created'
            })
            router.replace("/(auth)/sign-in");
        }
        else {
            console.log("no okela bro", res);
            const usernameError = res.errors.find((err: any) => err.path == "username");
            const passwordError = res.errors.find((err: any) => err.path == "password");
            setAuthData({
                ...authData,
                error: {
                    username: usernameError?.msg || '',
                    password: passwordError?.msg || '',
                }
            })
        }
        setButtonState({ type: 'SET_LOADING', payload: false });
    }

    const handleAuth = async () => {
        if (type == 'Login') {
            await handleLogin();
        }
        else {
            await handleSignUp();

        }
    }

    const changeColor = (bgColor: string, txtColor: string) => {
        setButtonState({ type: 'SET_BGCOLOR', payload: bgColor })
        setButtonState({ type: 'SET_TXTCOLOR', payload: txtColor })
    }

    const styles = StyleSheet.create({
        button: {
            width: "100%",
            backgroundColor: buttonState.bgColor
        },
    })
    return (
        <>
            <Button
                loading={buttonState.loading}
                onPress={() => handleAuth()}
                onPressIn={() => changeColor('#E5FFCC', 'black')}
                onPressOut={() => changeColor('#181B24', 'white')}
                buttonStyle={[styles.button]}
                titleStyle={{ color: buttonState.txtColor }}
                title={type}
            />
        </>
    )
}



export default AuthButton