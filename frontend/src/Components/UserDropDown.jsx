/* eslint-disable react/prop-types */
import { useState } from 'react'
import Dropdown from './Dropdown'
import '../Components/DropDown.css'

const UserDropdown = ({ userInfo, logoutHandler }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const handleMouseEnter = () => setDropDownOpen(true) // Open dropdown on hover
  const handleMouseLeave = () => setDropDownOpen(false) // Close dropdown when mouse leaves

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center text-black hover:bg-yellow-300 ">
        {userInfo && <span>{userInfo.username}</span>}
        {userInfo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropDownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
            />
          </svg>
        )}
      </button>
      {dropDownOpen && (
        <Dropdown userInfo={userInfo} logoutHandler={logoutHandler} />
      )}
    </div>
  )
}

export default UserDropdown
