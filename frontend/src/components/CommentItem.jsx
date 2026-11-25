import { useAuth } from '../hooks/useAuth.jsx'

function CommentItem({ id, user, content, onDelete }) {
    const auth = useAuth()
    const mine = auth.user && user.id === auth.user.id

    async function handleDelete() {
        await auth.authApi(`/api/comments/${id}`, {
            method: 'DELETE'
        })
        onDelete(id)

    }

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span><b>{user.username}</b> { content }</span>
            {mine && (
                <button 
                    className="btn btn-sm btn-link text-danger p-0"
                    onClick={ handleDelete }
                >
                    삭제
                </button>
            )}
        </li>
    )
}

export default CommentItem