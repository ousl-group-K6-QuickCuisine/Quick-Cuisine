// components/NavLink.js
import { Link } from 'react-router-dom'
// import './NavLink.css' // Optional CSS file for styling

const NavLink = ({ to, children }) => {
  return (
    <Link to={to} className="nav_items">
      <span className="link">{children}</span>
    </Link>
  )
}

export default NavLink
