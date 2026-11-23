import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { api } from '../api.js'
import PostCard from '../components/PostCard.jsx'

function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        async function load() {
            setPost(await api(`/api/posts/${id}`))
        }
        load()
    }, [id]) 


    if (!post) return <p> 불러오는 중...</p>

    return <PostCard {...post} />


}

export default PostDetail