import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlices'
import { logout } from '../../redux/features/auth/authSlice'
import NavLink from '../../Components/NavLink'
import AuthLinks from '../../Components/AuthLinks'
import UserDropdown from '../../Components/UserDropDown'
import './Navigation.css'
import FavoritesCount from '../Products/FavoritesCount'

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const [dropDownOpen, setDropDownOpen] = useState(false)
  // const [showMobileMenu, setShowMobileMenu] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  // const toggleMobileMenu = () => {
  //   setShowMobileMenu(!showMobileMenu)
  // }

  // const closeMobileMenu = () => {
  //   setShowMobileMenu(false)
  // }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  // // Close the mobile menu when a user clicks outside of it (optional)
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (!e.target.closest('.nav_bar') && showMobileMenu) {
  //       closeMobileMenu()
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [showMobileMenu])

  return (
    <nav className="nav_bar">
      <div className="logo">
        <h1 className="logo_img">
          <span className="text-[#fabc3f] mr-2 text-3xl">Quick</span>Cusine
        </h1>
      </div>

      {/* <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button> */}
      {/* 
      <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
        <NavLink to="/" onClick={closeMobileMenu}>
          Home
        </NavLink>
        <NavLink to="/" onClick={closeMobileMenu}>
          Menu
        </NavLink>
        <NavLink to="/" onClick={closeMobileMenu}>
          Cart
        </NavLink>
        <NavLink to="/" onClick={closeMobileMenu}>
          Favorite
        </NavLink>
        <NavLink to="/" onClick={closeMobileMenu}>
          About Us
        </NavLink>
        {!userInfo && (
          <div className="auth">
            <AuthLinks onLinkClick={closeMobileMenu} />
          </div>
        )}
      </div>   */}

      {/* Desktop menu */}
      <div className="nav_link">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>

        <div className="relative flex items-center">
          <NavLink
            to="/cart"
            className="text-lg font-semibold text-gray-800 hover:text-yellow-500 transition-colors"
          >
            Cart
          </NavLink>
          <div className="absolute top-[-0.2rem] right-[-0.5rem]">
            {cartItems.length > 0 && (
              <span className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-full">
                {cartItems.reduce((acc, c) => acc + c.qty, 0)}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex items-center">
          <FavoritesCount />
          <NavLink to="/favorite" className="nav-item" activeClassName="">
            Favorite
          </NavLink>
        </div>
        <NavLink to="/aboutUs">About Us</NavLink>
      </div>

      {userInfo ? (
        <UserDropdown
          userInfo={userInfo}
          dropDownOpen={dropDownOpen}
          toggleDropDown={toggleDropDown}
          logoutHandler={logoutHandler}
        />
      ) : (
        <AuthLinks />
      )}
    </nav>
  )
}

export default Navigation
