import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

type AuthData = {
    token: string,
    username: string,
    avatar_url: string | null,
    gmail: string | null,
    loading: boolean
}

const AuthContext = createContext<AuthData>({
    token: '',
    username: '',
    avatar_url: null,
    gmail: null,
    loading: true
})

const AuthProvider = ({ children }: PropsWithChildren) => {

    const [authData, setAuthData] = useState<AuthData>({
        token: 'okela',
        username: '',
        avatar_url: null,
        gmail: null,
        loading: true
    })

    // check login

    
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);