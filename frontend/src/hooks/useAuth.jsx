import { createContext , useContext, useState, useEffect} from "react"
import { api } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    // token이 변경될 때마다 사용자 정보 새로 가져오기
    useEffect(() => { 
        async function load() {
            // 토큰이 없는 경우 아무 실행도 하지 않음
            if (!token) return
            try {
                setUser(await api('/api/auth/me', {headers: { Authorization: `Bearer ${token}`} }))
            } catch (e) {
                logout()
            }
        }
        load()
    }, [token])

    // 최초 한번 쿠키(refresh_token)로 access token 발행
    useEffect(() => {
        async function load() {
            try {
                const data = await api(
                    '/api/auth/refresh', 
                    {method: 'POST', credentials: 'include'}
                )
                setToken(data.access_token)
            } catch (e) {
                setToken(null)
            }
            setReady(true)
        }
        load()
    }, [])
    
    async function login(username, password) {
        const data = await api('/api/auth/login', {
            method: 'POST',
            body: new URLSearchParams({ username, password }), 
            credentials: 'include'
        })
        // console.log('=====')
        // console.log(data)

        setToken(data.access_token)
        // localStorage.setItem('access_token', data.access_token)
    }
    function logout() { 
        // 쿠키 삭제
        api('/api/auth/logout', {method: 'POST', credentials: 'include'})
        // access_token 삭제
        setToken(null) 
        // 유저 정보 삭제, 로그아웃을 한 경우 userstate도 비움
        setUser(null)
        // localStorage.removeItem('access_token')
    }

    return <AuthContext value={{token, user, ready, login, logout}}>{ children }</AuthContext>
}


// 하위 컴포넌트에서 provider의 state에 접근하기 위한 함수
export function useAuth() {
    return useContext(AuthContext)
}

