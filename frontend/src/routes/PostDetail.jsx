import { useParams } from 'react-router'

function PostDetail() {
    const { id } = useParams()

    return <h2>{ id }번 글!</h2>


}

export default PostDetail