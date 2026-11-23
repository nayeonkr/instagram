import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.jsx'

function Navbar() { 
    const { token, logout } = useAuth()

    return (
    <nav className="navbar bg-white border-bottom sticky-top px-3">
        <Link className="navbar-brand" to="/">insta</Link>
        { token ? 
            <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
        :
            <Link className="btn btn-sm btn-outline-secondary" to="/login">Login</Link>
        }
    </nav>
    )
}

export default Navbar