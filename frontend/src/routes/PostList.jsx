import { api } from '../api.js'
import { useState, useEffect } from 'react'


function PostList() {
 
    // 게시물을 저장할 state 생성
    const [posts, setPosts] = useState([]) 

    // 이 컴포넌트가 생성될 때 외부에서 데이터 가져오기
    useEffect(() => {
        async function load() {
            setPosts(await api('/api/posts'))
        }
        load()
    }, [])

  return (
    <>
    <h2>전체 게시물</h2>
    { posts.length === 0 && <p> 불러오는중</p>}

    <div>
        {/* {% for post in posts %}
        <p>{{post.content}}</p>
        {% endfor %} */}

        { posts.map(post => (
            <p key={post.id}>{post.content}</p>
        ))}
    </div>
    </>
  )
}

export default PostList