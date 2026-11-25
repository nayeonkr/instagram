import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

function CommentForm({ postId, onCreate }) {

    const [text, setText] = useState('')
    const auth = useAuth()


    async function handleSubmit(e) {
        e.preventDefault()
        const created = await auth.authApi(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: text })
        })
        // console.log(created)
        onCreate(created)
        setText('')
    }

    return (
        <form action="" className="input-group mt-3" onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={ text }onChange={e => setText(e.target.value)}/>
            <button className="btn btn-outline-primary">제출</button>
        </form>
    )
}

export default CommentForm
