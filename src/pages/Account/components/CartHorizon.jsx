import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../components/Image'
import Score from '../../../components/Score'
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
const CartHorizon = () => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md border border-gray-300 flex">
      <div className="max-w-[133px] w-full">
        <Image
          ratio={150}
          src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
        />
      </div>
      <div className="px-4 py-5 flex flex-col">
        <div className="flex items-center mb-4">
          <Score
            size="lg"
            score={70}
          />
          <div className="pl-2">
            <Link
              className="text-lg font-bold mb-1"
              to='/'
            >Doctor Strange in the Multiverse of Madness</Link>
            <p className="text-gray-500 text-sm">
              6 May 2022
            </p>
          </div>
        </div>
        <p className="text-md">
          Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.
        </p>

        <ul className='mt-auto flex'>
          <li className='flex items-center text-gray-400 mr-4'>
            <span className="inline-flex p-2 hover:text-white text-gray-400 hover:bg-gray-400 cursor-pointer rounded-full border border-gray-400">
              <StarIcon
                sx={{
                  fontSize: "16px"
                }}
              />
            </span>
            <p className='ml-4'>Your rating</p>
          </li>
          <li className='flex items-center text-gray-400 mr-4'>
            <span className="inline-flex p-2 hover:text-white text-gray-400 hover:bg-gray-400 cursor-pointer rounded-full border border-gray-400">
              <FavoriteIcon
                sx={{
                  fontSize: "16px"
                }}
              />
            </span>
            <p className='ml-4'>Favourite</p>
          </li>
          <li className='flex items-center text-gray-400 mr-4'>
            <span className="inline-flex p-2 hover:text-white text-gray-400 hover:bg-gray-400 cursor-pointer rounded-full border border-gray-400">
              <ListIcon
                sx={{
                  fontSize: "16px"
                }}
              />
            </span>
            <p className='ml-4'>Add to list</p>
          </li>
          <li className='flex items-center text-gray-400 mr-4'>
            <span className="inline-flex p-2 hover:text-white text-gray-400 hover:bg-gray-400 cursor-pointer rounded-full border border-gray-400">
              <CloseIcon
                sx={{
                  fontSize: "16px"
                }}
              />
            </span>
            <p className='ml-4'>Remove</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CartHorizon