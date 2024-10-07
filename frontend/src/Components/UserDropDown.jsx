/* eslint-disable react/prop-types */
// components/UserDropdown.js
import Dropdown from './Dropdown'
// import './UserDropdown.css' // Optional CSS file for styling

const UserDropdown = ({
  userInfo,
  dropDownOpen,
  toggleDropDown,
  logoutHandler,
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center text-black-800 focus:outline-none"
        onClick={toggleDropDown}
      >
        {userInfo ? <span>{userInfo.username}</span> : <></>}
        {userInfo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${
              dropDownOpen ? 'transform rotate-180' : ''
            }`}
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
      <Dropdown
        userInfo={userInfo}
        dropDownOpen={dropDownOpen}
        logoutHandler={logoutHandler}
      />
    </div>
  )
}

export default UserDropdown
