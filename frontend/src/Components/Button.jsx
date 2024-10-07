// eslint-disable-next-line react/prop-types
export const Button = ({ type, buttonName, onclick }) => {
  return (
    <div className="btn-container">
      <button type={type} className="btn" onClick={onclick}>
        {buttonName}
      </button>
    </div>
  )
}
