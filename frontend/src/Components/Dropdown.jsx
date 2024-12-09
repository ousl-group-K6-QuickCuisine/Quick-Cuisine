/* eslint-disable react/prop-types */
// Dropdown.js
import { Link } from 'react-router-dom'
import '../Components/DropDown.css'
import AdminMenu from '../pages/Admin/AdminMenu'

const Dropdown = ({ userInfo, dropDownOpen, logoutHandler }) => {
  return (
    <>
      {dropDownOpen && userInfo && (
        <ul className="dropdown_content">
          {userInfo.isAdmin && (
            <>
              {/* <AdminMenu /> */}
              <li>
                <Link to="/admin/dashboard" className="dropdown_item">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/productlist" className="dropdown_item">
                  Create Product
                </Link>
              </li>
              <li>
                <Link to="/admin/category" className="dropdown_item">
                  Create Category
                </Link>
              </li>
              <li>
                <Link to="/admin/allproductslist" className="dropdown_item">
                  All Product
                </Link>
              </li>
              <li>
                <Link to="/admin/user_list" className="dropdown_item">
                  Manage User
                </Link>
              </li>
              <li>
                <Link to="/admin/order-lists" className="dropdown_item">
                  Manage Order
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
