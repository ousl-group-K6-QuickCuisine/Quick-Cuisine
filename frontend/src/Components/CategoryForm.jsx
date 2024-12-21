/* eslint-disable react/prop-types */
import './CategoryForm.css'

// const CategoryForm = ({
//   value,
//   setValue,
//   handleSubmit,
//   buttonText = 'Submit',
//   handleDelete,
// }) => {
//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           className="form-input"
//           placeholder="Write Category name"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <div className="button-group">
//           <button type="submit" className="button button-submit">
//             {buttonText}
//           </button>

//           {handleDelete && (
//             <button onClick={handleDelete} className="button button-delete">
//               Delete
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }
import './CategoryForm.css'

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = 'Created',
  handleDelete,
}) => {
  return (
    <div className="form-container">
      <h2 className="form-header">Created Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="form-input"
          placeholder="Write Category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="button-group">
          <button type="submit" className="button button-submit">
            {buttonText}
          </button>

          {handleDelete && (
            <button onClick={handleDelete} className="button button-delete">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
