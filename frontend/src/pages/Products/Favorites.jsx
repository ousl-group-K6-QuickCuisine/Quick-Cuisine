import { useSelector } from 'react-redux'
import { selectFavoriteProduct } from '../../redux/features/Favorites/FavoritesSlice'
import Product from './Product'

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct)
  return (
    <div className="ml-[10rem] mt-[7rem]">
      <h1 className="text-LG font-bold ml-[3rem] mt-[3rem] inline-block">
        Favorite Products
      </h1>

      <div className="flex flex-wrap gap-5 ">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
export default Favorites
