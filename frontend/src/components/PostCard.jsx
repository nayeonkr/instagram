import { SERVER_URL , api} from '../api.js'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.jsx'

function PostCard({ id, content, created_at, image_url, user, likes , onUpdate}) {

  const auth = useAuth()
  // some => 하나라도 만족하면 true 반환하고 더이상 반복 안함
  const liked =  auth.user && likes.some((like) => { return auth.user.id === like.user_id})

  async function handleLike() {
    const updated = await auth.authApi(`/api/posts/${id}/likes`,{
      method: liked ? 'DELETE' : 'POST' ,
      // headers: {Authorization: `Bearer ${auth.token}`}
    })
    // console.log(updated)
    onUpdate(updated)
  }


    return (
    <article className="card mb-4">
      <div className="card-header bg-white d-flex align-items-center gap-2">
        <i className="bi bi-person-circle fs-4"></i>
        <b>{user.username}</b>
      </div>
      {image_url && (
        <Link className="ratio ratio-1x1" to={`/posts/${id}`}>
          <img src={`${SERVER_URL}${image_url}`} alt={content} className="object-fit-cover" />
        </Link>
      )}
      <div className="card-body">
        <div className="fs-4 mb-2">
          <button className="btn btn-link p-0 text-reset me-2 fs-4" onClick={ handleLike }>
          <i className={ liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart' }></i>
          </button>
          <Link className="btn btn-link p-0 text-reset fs-4" to={`/posts/${id}`}>
          <i className="bi bi-chat"></i>
          </Link>
        </div>
        <p className="mb-1"><b>좋아요 {likes.length}개</b></p>
        <p className="mb-1"><b>{user.username}</b> {content}</p>
        <small className="text-secondary">{new Date(created_at).toLocaleString('ko-KR')}</small>
      </div>
    </article>

    )
}

export default PostCard