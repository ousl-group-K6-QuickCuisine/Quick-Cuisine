import { useSelector } from 'react-redux'

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites)
  const favoriteCount = favorites.length

  return (
    favoriteCount > 0 && (
      <div className="absolute top-0 right-0 px-1.5 py-1 bg-[#fdc82a] text-white  rounded-full text-xs">
        {favoriteCount}
      </div>
    )
  )
}

export default FavoritesCount
