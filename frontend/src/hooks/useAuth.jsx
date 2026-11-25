import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    // token이 변경될때마다 사용자 정보 새로 가져오기
    useEffect(() => { 
        async function load() { 
        if (!token) return 
        try {
            setUser(await api('/api/auth/me', { headers: {Authorization: `Bearer ${token}`} }))
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
            { method: 'POST', credentials: 'include' }
            )
            setToken(data.access_token)
        } catch (e) {
            setToken(null)
        }
        setReady(true)
        }
        load()
    }, []) 

    // 로그인이 필요한 요청 => 401이면 새로운 토큰 발생받아서 한번더 요청
    async function authApi(path, options) {
        try {
        return await api(path, { ...options, headers: {...options.headers, Authorization: `Bearer ${token}`} })
        
        } catch (e) {
        if (e.status != 401) throw e
        
        // 401(인증에러)인데 refresh는 살아있다면 access를 재발행 => token state에 저장
        const data = await api('/api/auth/refresh', { method: 'POST', credentials: 'include' })
        setToken(data.access_token)
        return await api(path, { ...options, headers: {Authorization: `Bearer ${data.access_token}`} })
        }
    }
    
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

    async function logout() { 
        // 쿠키삭제
        await api('/api/auth/logout', {method: 'POST', credentials: 'include'})
        // access_token 삭제
        setToken(null)
        // 유저정보 삭제
        setUser(null)
        // localStorage.removeItem('access_token')
    }

    return <AuthContext value={{token, user, ready, login, logout, authApi}} >{ children }</AuthContext>
    }


    // 하위 컴포넌트에서 provider의 state에 접근하기 위한 함수
    export function useAuth() {
    return useContext(AuthContext)
    }