import Navbar from './components/Navbar.jsx'
import PostList from './routes/PostList.jsx'
import PostDetail from './routes/PostDetail.jsx'
import Login from './routes/Login.jsx'
import RequireLogin from './components/RequireLogin.jsx'

import { Routes, Route } from 'react-router'

function App() {
  return (
    <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <Navbar />
              <main className="py-4">
                <Routes>
                  <Route element={<RequireLogin/>}>
                    <Route path="/" element={<PostList />} />
                    <Route path="/posts/:id" element={ <PostDetail/>} />
                  </Route>
                  <Route path="/login" element={ <Login />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
  )
}

export default App