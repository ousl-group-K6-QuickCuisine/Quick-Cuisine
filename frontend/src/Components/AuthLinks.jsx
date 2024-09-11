// components/AuthLinks.js
import { Link } from 'react-router-dom'
// import './AuthLinks.css' // Optional CSS file for styling

const AuthLinks = () => {
  return (
    <div className="auth">
      <Link to="/login" className="auth_log nav_items">
        <span>Login</span>
      </Link>
      <Link to="/register" className="auth_register nav_items">
        <span>Register</span>
      </Link>
    </div>
  )
}

export default AuthLinks
