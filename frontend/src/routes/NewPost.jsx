import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function NewPost() {

    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const [error, setError] = useState('')
    const [crop, setCrop] = useState(null)
    const [sending, setSending] = useState(false)
    const { authApi } = useAuth()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setSending(true)
        // 사용자의 입력값을 가지고 서버로 게시물 작성 요청
        try{
            // 사진이 있는 경우 => 사진을 먼저 업로드 하고 image_url 받아오기
            let image_url = null
            if (file) {
                const formData = new FormData()
                formData.append('photo', file)

                if (crop) {
                    formData.append('x', crop.x)
                    formData.append('y', crop.y)
                    formData.append('width', crop.width)
                    formData.append('height', crop.height)
                }

                const data = await authApi('/api/uploads', {method: 'POST', body: formData})
                image_url = data.image_url
            }

            // 컨텐츠 내용을 가지고 게시물 작성 요청
            await authApi('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, image_url }),
            })
            navigate('/')
        } catch (e) {
            setError(e.message)
            setSending(false)
        }
    }

    function handleFile(e) {
        const picked = e.target.files[0]
        setFile(picked)
        if (preview) URL.revokeObjectURL(preview)
        setPreview(picked ? URL.createObjectURL(picked) : '')
        setCrop(null)
    }

    return (
        <div className="card p-3">
            <h2 className="h5 mb-3">새 게시물</h2>
            <form className="d-grid gap-2" onSubmit={handleSubmit}>
                <input className="form-control" type="file" accept="image/*" onChange={handleFile} />
                {file && (
                    // <div className="ratio ratio-1x1">
                    //     <img src={URL.createObjectURL(file)} className="object-fit-cover rounded" alt="선택한 이미지 미리보기" />
                    // </div>
                    <ReactCrop crop={ crop } onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)} aspect={1}>
                        <img src={preview} className="img-fluid" />
                    </ReactCrop>
                )}
                <textarea className="form-control" rows={3} value={content} onChange={e => setContent(e.target.value)} placeholder="문구 입력…" required />
                <button className="btn btn-primary" disabled={sending}>{sending ? '보내는중...' : '공유하기'}</button>
            </form>
            {error && <p className="text-danger mt-3 mb-0">{error}</p>}
        </div>
    )

}

export default NewPost
