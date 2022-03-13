import React from 'react'
import { NavLink } from 'react-router-dom';
import Score from './Score';

import imageNotFound from '../images/image-notfound.svg';
import imageSamble from '../images/movie1.jpg';
import { getImage } from '../services/movieApi';
import moment from 'moment';
const Card = ({data}) => {
    return (
        <div>
            <NavLink to="/detail">
                <div className="relative mb-6">
                    {/* <img src={imageNotFound} className="rounded-lg min-h-[225px] px-10 bg-gray-200" alt="image" /> */}
                    <img src={getImage(data.poster_path)} className="rounded-lg min-h-[225px]" alt="image" />
                    <div className="absolute bottom-0 left-2 translate-y-1/2">
                        <Score size="md" score={data.vote_average * 10} />
                    </div>
                </div>
                <div>
                    <p>
                        <strong>{data.original_title}</strong>
                    </p>
                    <p className="font-light text-gray-600 text-sm">
                        {moment(new Date(data.release_date)).format('DD MMMM YYYY')}
                    </p>
                </div>
            </NavLink>
        </div>
    )
}

export default React.memo(Card)