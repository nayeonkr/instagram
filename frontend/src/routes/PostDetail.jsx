import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { api } from '../api.js'
import PostCard from '../components/PostCard.jsx'
import CommentItem from '../components/CommentItem.jsx'
import CommentForm from '../components/CommentForm.jsx'

function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function load() {
            try {
                setPost(await api(`/api/posts/${id}`))
                setComments(await api(`/api/posts/${id}/comments`))
            }   catch (e) {
                setError(e.message)
            }
        }
        load()
    }, [id]) 

    function handleCreate(created) {
        setComments([...comments, created])
    }

    if (error) return <p className="text-danger">{ error }</p>
    if (!post) return <p> 불러오는 중...</p>

    return (
        <>
        <PostCard {...post} onUpdate={ setPost }/>
        <h3>댓글</h3>
        <ul className="list-group">
            {comments.map(c => (
                <CommentItem key={c.id} {...c} />
            ))}
        </ul>
        <CommentForm postId={ post.id } onCreate={ handleCreate }/>
        </>
    )


}

export default PostDetail