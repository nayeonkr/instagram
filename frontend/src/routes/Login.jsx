import { useState } from 'react'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  return (
    <>
        <h1>로그인페이지입니다.</h1>
        <form action="">
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} />
            <input type="password" onChange={(e) => { setPassword(e.target.value)}} />
            <button>제출</button>
        </form>
    </>
  )
}

export default Login