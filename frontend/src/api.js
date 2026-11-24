export const SERVER_URL = 'http://localhost:8000'

export async function api(path, options) {
    // localhost/posts, localhost/posts/3/likes
    const res = await fetch(`${SERVER_URL}${path}`, options)

    // 문제가 있을 때
    if (!res.ok) {
        const data = await res.json()
        // {"detail": "해당 게시물이 없습니다."}
        throw new Error(data.detail)
    }
    if (res.status === 204) return null
    return await res.json() // 문제 없을 때
}