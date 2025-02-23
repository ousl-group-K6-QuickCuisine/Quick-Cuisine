/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../Components/DropDown.css'

const Dropdown = ({ userInfo, logoutHandler }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ul className="dropdown-content shadow-lg rounded-md bg-white border border-gray-200 absolute right-0 mt-2 py-2 w-56 z-50">
      {/* Mobile Links */}
      {isMobile && (
        <>
          <li>
            <Link to="/" className="dropdown-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="dropdown-item">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/menu" className="dropdown-item">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/menu" className="dropdown-item">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/menu" className="dropdown-item">
              Menu
            </Link>
          </li>
        </>
      )}
      {/* Admin Links */}
      {userInfo.isAdmin && (
        <>
          <li>
            <Link to="/admin/dashboard" className="dropdown-item">
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/productlist" className="dropdown-item">
              Create Product
            </Link>
          </li>
          <li>
            <Link to="/admin/category" className="dropdown-item">
              Create Category
            </Link>
          </li>
          <li>
            <Link to="/admin/allproductslist" className="dropdown-item">
              All Products
            </Link>
          </li>
          <li>
            <Link to="/admin/user_list" className="dropdown-item">
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/admin/order-lists" className="dropdown-item">
              Manage Orders
            </Link>
          </li>
          <hr className="my-2 border-gray-300" />
        </>
      )}

      {/* General Links */}
      <li>
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
      </li>
      <li>
        <button
          onClick={logoutHandler}
          className="dropdown-item text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default Dropdown
