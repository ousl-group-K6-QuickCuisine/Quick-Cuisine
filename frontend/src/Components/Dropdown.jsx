/* eslint-disable react/prop-types */
// Dropdown.js
import { Link } from 'react-router-dom'
import '../Components/DropDown.css'

const Dropdown = ({ userInfo, dropDownOpen, logoutHandler }) => {
  return (
    <>
      {dropDownOpen && userInfo && (
        <ul className="dropdown_content">
          {userInfo.isAdmin && (
            <>
              <li>
                <Link to="/admin/dashboard" className="dropdown_item">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/product_list" className="dropdown_item">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/admin/category" className="dropdown_item">
                  Category
                </Link>
              </li>
              <li>
                <Link to="/admin/order_list" className="dropdown_item">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/user_list" className="dropdown_item">
                  Users
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/profile" className=" dropdown_item">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className=" dropdown_item"
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
