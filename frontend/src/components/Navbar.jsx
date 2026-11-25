import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.jsx'

function Navbar() { 
    const { token, logout, user} = useAuth()

    return (
    <nav className="navbar bg-white border-bottom sticky-top px-3">
        <Link className="navbar-brand" to="/">insta</Link>
        { token ? 
            <div className="d-flex align-items-center gap-2">
                <Link class="text-reset" to="/new"><i className="bi bi-plus-square"></i></Link>
                { user && <b>{ user.username }</b>}
                <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
            </div>
            
        :
            <Link className="btn btn-sm btn-outline-secondary" to="/login">Login</Link>
        }
    </nav>
    )
}

export default Navbar