import clsx from 'clsx';
import React from 'react'
import { NavLink } from 'react-router-dom';

import sampleImage from '../images/Actor.jpg';
const CardActor = ({ className }) => {
    return (
        <div className={clsx('shadow-md overflow-hidden border border-gray-200 rounded-md', className)}>
            <img src={sampleImage} alt="Actor" className="min-h-[175px]" />
            <div className="p-2">
                <NavLink to="/actor">
                    <p className="font-bold text-md">Mario Cimarro</p>
                </NavLink>
                <p className="text-sm m-0">
                    Juan Reyes
                </p>
                <p className="text-gray-400 text-sm">208 Episodes</p>
            </div>
        </div>
    )
}

export default CardActor