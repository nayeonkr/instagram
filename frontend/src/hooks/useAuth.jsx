import { createContext , useContext, useState } from "react"
import { api } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    
    async function login(username, password) {
        const data = await api('/api/auth/login', {
            method: 'POST',
            body: new URLSearchParams({ username, password })
        })
        setToken(data.access_token)
        localStorage.setItem('access_token', data.access_token)
    }
    function logout() {
        setToken(null)
        localStorage.removeItem('access_token')
    }


    return <AuthContext value={{token, login, logout}}>{ children }</AuthContext>
}


// 하위 컴포넌트에서 provider의 state에 접근하기 위한 함수
export function useAuth() {
    return useContext(AuthContext)
}