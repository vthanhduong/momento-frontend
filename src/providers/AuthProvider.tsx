import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from '@/api/auth';

type AuthData = {
    token: string;
    nickname: string;
    avatar: string | null;
    error: object | null;
    loading: boolean;
};

type AuthContextType = {
    authData: AuthData;
    setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
    handleRefreshToken: () => void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authData, setAuthData] = useState<AuthData>({
        token: '',
        nickname: '',
        avatar: null,
        error: null,
        loading: true
    });


    const handleRefreshToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log("token storaged", token);

            if (token) {
                const resRefresh = await refreshToken(token);
                console.log("resRefresh", resRefresh);

                if (resRefresh?.status === "authorized") {
                    const newToken = resRefresh?.data?.token;
                    const nickname = resRefresh?.data?.nickname || '';
                    const avatar = resRefresh?.data?.avatar || null;

                    await AsyncStorage.setItem('authToken', newToken);

                    setAuthData({
                        token: newToken,
                        nickname,
                        avatar,
                        error: null,
                        loading: false,
                    });
                } else {
                    throw new Error("Unauthorized");
                }
            } else {
                throw new Error("No token");
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            await AsyncStorage.removeItem('authToken');
            setAuthData({
                token: '',
                nickname: '',
                avatar: null,
                error: null,
                loading: false
            });
        }
    };



    return (
        <AuthContext.Provider value={{ authData, setAuthData, handleRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
