import { useAuth } from '../hooks/useAuth.jsx'
import { useState } from 'react'

function CommentItem({ id, user, content, onDelete, onUpdate }) {

    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(content)

    const auth = useAuth()
    const mine = auth.user && user.id === auth.user.id

    async function handleDelete() {
        await auth.authApi(`/api/comments/${id}`, {
            method: 'DELETE'
        })
        onDelete(id)

    }

    function handleCancle() {
        setText(content)
        setEditing(false)
    }

    async function handleSave(e) {
        e.preventDefault()
        const updated = await auth.authApi(`/api/comments/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: text })
            
        })
        // console.log(updated)
        onUpdate(updated)
        setEditing(false)
    }

    if (editing) {
        return (
            <li className="list-group-item">
                <form action="" className="input-group input-group-sm" onSubmit={handleSave}>
                    <input className="form-control" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button className="btn btn-primary">저장</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancle}>취소</button>
                </form>
            </li>
        )
    }

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span><b>{user.username}</b> { content }</span>
            {mine && (
                <span>
                    <button
                        className="btn btn-sm btn-link p-0"
                        onClick={() => { setEditing(true) }}
                    >
                        수정
                    </button>
                    <button 
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={handleDelete}
                        >
                        삭제
                    </button>
                </span>
            )}
        </li>
    )
}

export default CommentItem