import { login } from "@/api/auth"
import { useAuth } from "@/providers/AuthProvider"
import { Button, color } from "@rneui/base"
import { useRouter } from "expo-router"
import { useReducer } from "react"
import { StyleSheet, View } from "react-native"

type LoginPayload = {
    username: string,
    password: string
}

type SignUpPayload = {
    email: string,
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
    const { setAuthData } = useAuth();


    const [buttonState, setButtonState] = useReducer(
        (
            state: {
                loading: boolean,
                bgColor: string,
                txtColor: string
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
            txtColor: 'white',
        }
    );


    const handleLogin = async () => {
        setButtonState({ type: 'SET_LOADING', payload: true });
        setAuthData({ token: '', username: '', avatar_url: null, gmail: null, loading: true });
        const payload = {
            username: authPayload.username.trim(),
            password: authPayload.password.trim()
        }
        console.log("Hello", payload);

        const res = await login(payload);
        if (res?.status == 'success') {
            console.log("okela bro", res);
            // set token for AuthProviders
            setAuthData({ token: res.data.token, username: '', avatar_url: null, gmail: null, loading: false });
            router.replace("/");

        }
        else {
            console.log("no okela bro", res);
        }
        setButtonState({ type: 'SET_LOADING', payload: false });
    }

    const handleSignUp = async () => {
        console.log("Sign Up bra");
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
            borderRadius: 8,
            backgroundColor: buttonState.bgColor,
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