// Dropdown.js
import { Link } from 'react-router-dom'

const Dropdown = ({ userInfo, dropDownOpen, logoutHandler }) => {
  return (
    <>
      {dropDownOpen && userInfo && (
        <ul
          className={`absolute right-0 mt-2 space-y-2 bg-gray-800 shadow-lg rounded text-black-600 w-48 ${
            !userInfo.isAdmin ? 'top-10' : 'top-10'
          }`}
        >
          {userInfo.isAdmin && (
            <>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-[#fabc3f]"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productlist"
                  className="block px-4 py-2 hover:bg-[#fabc3f]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/category"
                  className="block px-4 py-2 hover:bg-[#fabc3f]"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orderlist"
                  className="block px-4 py-2 hover:bg-[#fabc3f]"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/userlist"
                  className="block px-4 py-2 hover:bg-[#fabc3f]"
                >
                  Users
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/admin/profile"
              className="block px-4 py-2 hover:bg-[#fabc3f]"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/logout"
              className="block px-4 py-2 hover:bg-[#fabc3f]"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </>
  )
}

export default Dropdown
