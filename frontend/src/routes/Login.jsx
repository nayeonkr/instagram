import { useState } from 'react'
import { api , SERVER_URL } from '../api.js'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.jsx'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] =useState('')

    const navigate = useNavigate()
    const { login } = useAuth()
    
    async function handleSubmit(e) {
        e.preventDefault()
        
        // 로그인 처리 (fastapi에게 토큰 달라고 하기)
        try {            
            await login(username, password)
            // const data = await api(`/api/auth/login`, {
            // method: 'POST', 
            // body: new URLSearchParams({username, password})
            // })

            // localStorage.setItem('access_token', data.access_token)
            navigate('/')

        } catch (e) {
            setError(e.message)
            setPassword('')
        }
    }

  return (
    <>
    <div className="card p-4 text-center">
    <h2 className="mb-4">insta</h2>
    <form className="d-grid gap-2" onSubmit={handleSubmit}>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="아이디" required />
            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" required />
            <button className="btn btn-primary">로그인</button>
    </form>
    <div className="d-grid gap-2 mt-3">
        <a className="btn btn-outline-dark" href={`${SERVER_URL}/api/auth/google/login`}>
            <i className="bi bi-google"></i>구글로 로그인
        </a>
    </div>
    { error && <p className="text-danger" >{error}</p> }
    </div>
    <p className="mt-3"><Link to="/signup">가입하기</Link></p>
    </>
  )
}

export default Login