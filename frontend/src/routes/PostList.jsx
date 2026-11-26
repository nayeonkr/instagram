import { api, SERVER_URL } from '../api.js'
import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

function PostList({ path }) {
 
    // 게시물을 저장할 state 생성
    const [posts, setPosts] = useState([]) 
    const [hasMore, setHasMore] = useState(true)

    const { authApi } = useAuth()

    // 이 컴포넌트가 생성될 때 외부에서 데이터 가져오기
    useEffect(() => {
        async function load() {
            const first = await authApi(path, {})
            setPosts(first)
            setHasMore(first.length === 10)
        }
        load()
    }, [path])

    async function loadMore() {
        const next = await authApi(`${path}?skip=${posts.length}`, {})
        setPosts([...posts, ...next])
        setHasMore(next.length === 10)
    }
    

    function handleUpdate(updated) {
        const newPosts = posts.map((post) => {
            if (post.id == updated.id) {
                return updated
            }
            return post
        })
        setPosts(newPosts)
        // setPosts(posts.map(post => post.id === updated.id ? updated : post))
    }

  return (
    <>
    <h2>전체 게시물</h2>
    { posts.length === 0 && <p> 불러오는중</p>}

    <div>
        {/* {% for post in posts %}
        <p>{{post.content}}</p>
        {% endfor %} */}

        { posts.map(post => (
            // <article key={post.id}>{post.content}
            // <h3>{post.user.username}</h3>
            // <p>{post.content}</p>
            // <p>좋아요{post.likes.length}개</p>
            // <p>{new Date(post.created_at).toLocaleString('ko-KR')}</p>
            // <img src={`${SERVER_URL}${post.image_url}`} alt="" />
            // </article>

            // <PostCard key={post.id} content={post.content}... />
            <PostCard key={post.id} {...post} onUpdate={ handleUpdate } />
        ))}
    </div>
    {hasMore && (
        <div className="text-center">
            <button class="btn btn-outline-secondary" onClick={loadMore}>더보기</button>
        </div>
    )}
    </>
  )
}

export default PostList