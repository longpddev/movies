import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { 
    addOrRemoveFavorite, 
    addOrRemoveWatchlist, 
    useFavorite, 
    useWatchlist,
    useRateMedia,
    addRateTvShow
} from "../../services/account";
import ActionItem from "./ActionItem";

const StarRateItem = ({
    children,
    onChange,
    onClick
}) => {
    return (
        <div className="relative cursor-pointer">
            <div>{children}</div>
            <div className="absolute flex inset-0 w-full h-full">
                <div
                  className="w-1/2 h-full"
                  onClick={() => onClick(0.5)}
                  onMouseEnter={() => onChange(0.5)}
                ></div>
                <div
                  className="w-1/2 h-full"
                  onClick={() => onClick(1)}
                  onMouseEnter={() => onChange(1)}
                ></div>
            </div>
        </div>
    )
}

const StarRate = ({
    rateDefault = 0,
    onChangeRate
}) => {
    const [rate, setRate] = useState(rateDefault)
    const handleChangeRate = () => {
        onChangeRate(rate)
    }

    useEffect(() => {
        if(rateDefault && rate !== rateDefault) {
            setRate(rateDefault)
        }
    }, [rateDefault])
    return (
        <div
          className="flex justify-between"
          onMouseLeave={() => setRate(rateDefault)}
        >
            {Array(5).fill(1).map((_, i) => {
                if(i < rate && i+1 > rate) {
                    return (
                        <StarRateItem
                          onClick={() => handleChangeRate()}
                          onChange={(density) => {
                            setRate(i + density)
                          }}
                        >
                            <StarHalfIcon />
                        </StarRateItem>
                    )
                } else if(i < rate) {
                    return (
                        <StarRateItem
                          onClick={() => handleChangeRate()}
                          onChange={(density) => {
                            setRate(i + density)
                          }}
                        >
                            <StarIcon />
                        </StarRateItem>
                    )
                } else {
                    return (
                        <StarRateItem
                          onClick={() => handleChangeRate()}
                          onChange={(density) => {
                            setRate(i + density)
                          }}
                        >
                            <StarBorderIcon />
                        </StarRateItem>
                    )
                }
            })}
        </div>
    )
}

const MiniTab = ({
    tabName,
    children,
    tabActive
}) => {
    return tabActive === tabName ? children : null
}


const GotoRoot = ({
    onClick
}) => {
    return (
        <div>
            <button
              onClick={onClick}
              className="hover:text-sky-500 flex items-center"
            >
                <KeyboardBackspaceIcon
                  sx={{
                    fontSize: "18px"
                }}
                />
            </button>
        </div>
    )
}

// type: tv_show, movies
const CardMoreAction = ({
    media_id,
    type
}) => {
    const dispatch = useDispatch()  
    const [openMoreAction, setOpenMoreAction] = useState(false)
    const [tabActive, setTabActive] = useState('root')
    const { isFavorite } = useFavorite(type)
    const { isWatchlist } = useWatchlist(type)
    const { isRating, getMyRate } = useRateMedia(type)
    const favorited = isFavorite(media_id)
    const watchlisted = isWatchlist(media_id)
    const rated = isRating(media_id)

    const handleMoreAction = e => {
        e.stopPropagation()
        setOpenMoreAction(!openMoreAction)
        if(openMoreAction) {
            setTabActive('root')
        }
    }
    const handleAddFavorite = () => dispatch(
        addOrRemoveFavorite({
            media_type: type === 'movies' ? 'movie' : "tv",
            media_id: media_id,
            favorite: !favorited
        })
    )
  
    const handleAddWatchlist = () => dispatch(
        addOrRemoveWatchlist({
            media_type: type === 'movies' ? 'movie' : "tv",
            media_id: media_id,
            watchlist: !watchlisted
        })
    )

    const handleChangeRate = value => {
        dispatch(addRateTvShow({
            media_id,
            rate: value
        }))
    }

    return (
        <>
            <div
              className="absolute top-3 right-3 z-20 cursor-pointer"
              onClick={handleMoreAction}
            >
                <AddCircleOutlineIcon className={`text-white ${openMoreAction ? "text-sky-400" : "hover:text-sky-400"}`} />
            </div>
            {openMoreAction && (
                <div className="absolute inset-0 w-full h-full z-10 flex items-center overflow-hidden justify-center">
                <div className="absolute inset-0 w-full h-full -z-10 opacity-90 bg-gray-700"></div>
                <MiniTab 
                  tabActive={tabActive}
                  tabName="root"
                >
                    <ul className="overflow-hidden rounded-md bg-white min-w-[80%]">
                        <ActionItem
                          onClick={() => {}}
                        >
                        <ListIcon
                          sx={{ fontSize: "18px", marginRight: '7px' }}
                          className="text-sky-400"
                        /> Add to list
                        </ActionItem>
                        <ActionItem
                          onClick={handleAddFavorite}
                        >
                        <FavoriteIcon
                          sx={{ fontSize: "18px", marginRight: '7px' }}
                          className={favorited ? "text-red-500" : "text-gray-600"}
                        /> Favorite
                        </ActionItem>
                        <ActionItem
                          onClick={handleAddWatchlist}
                        >
                        <BookmarkIcon
                          sx={{ fontSize: "18px", marginRight: '7px' }}
                          className={watchlisted ? "text-green-500" : "text-gray-600"}
                        /> Watchlist
                        </ActionItem>
                        <ActionItem
                          onClick={() => setTabActive('rating')}
                        >
                        <StarIcon
                          sx={{ fontSize: "18px", marginRight: '7px' }}
                          className={rated ? "text-sky-400" : ""}
                        /> Your rating
                        </ActionItem>
                    </ul>
                </MiniTab>
 
                <MiniTab 
                  tabActive={tabActive}
                  tabName="rating"
                >
                    <div className="overflow-hidden rounded-md bg-white  min-w-[80%] px-2 py-1">
                        <GotoRoot onClick={() => setTabActive('root')} />
                        <p
                          className='text-center text-gray-600 text-sm mb-1'
                        >
                            Add Your Rating
                        </p>
                        <StarRate
                          rateDefault={getMyRate(media_id) || 0}
                          onChangeRate={handleChangeRate}
                        />
                    </div>
                </MiniTab>
                
            </div>
            )}
        </>
    )
}

export default CardMoreAction