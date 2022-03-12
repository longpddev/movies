import React from 'react'
import { NavLink } from 'react-router-dom';
import Score from './Score';

import imageNotFound from '../images/image-notfound.svg';
import imageSamble from '../images/movie1.jpg';

const Card = ({}) => {
  return (
    <div>
        <NavLink to="/detail">
            <div className="relative mb-6">
                {/* <img src={imageNotFound} className="rounded-lg min-h-[225px] px-10 bg-gray-200" alt="image" /> */}
                <img src={imageSamble} className="rounded-lg min-h-[225px]" alt="image" />
                <div className="absolute bottom-0 left-2 translate-y-1/2">
                    <Score size="md" score={Math.round(Math.random() * 100)} />
                </div>
            </div>
            <div>
                <p className="">
                    <strong>After Yang</strong>
                </p>
                <p className="font-light text-gray-600 text-sm">
                    04 Mar 2020
                </p>
            </div>
        </NavLink>
    </div>
  )
}

export default Card