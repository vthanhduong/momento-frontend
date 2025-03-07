import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

type AuthData = {
    token: string;
    username: string;
    avatar_url: string | null;
    gmail: string | null;
    loading: boolean;
};

type AuthContextType = {
    authData: AuthData;
    setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authData, setAuthData] = useState<AuthData>({
        token: '',
        username: '',
        avatar_url: null,
        gmail: null,
        loading: true
    });

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
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
