import React from 'react'
import { NavLink } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import Score from '../components/Score';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import detailBanner from '../images/detailBanner.jpg';
import movie from '../images/movie1.jpg';
import CardActor from '../components/CardActor'
import { TabMedia } from '../containers/Tabs'
import SeconMenu from '../components/SeconMenu';
const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    prevNextButtons: false,
    freeScroll: true,
    contain: true,
}

const Detail = () => {
  return (
    <>
        <SeconMenu/>
        <div className="detail-banner" style={{ backgroundImage: `url(${detailBanner})` }}>
            <div className="detail-banner__inner">
                <div className="c-container">
                    <div className="flex flex-wrap py-8">
                        <div className="sm:w-1/4 w-full">
                            <img src={movie} alt="" className="w-full rounded-lg" />
                        </div>
                        <div className="sm:w-3/4 sm:pl-8 w-full flex items-center">
                            <div>
                                <h1 className="text-3xl text-white"><strong>Pasión de gavilanes</strong> (2003)</h1>
                                <p className="text-white text-sm space-x-3">
                                    <span className="block-inline text-sm text-gray-600 px-1 rounded-sm border border-gray-600">16</span>
                                    <span>Drama</span>
                                    <span>42m</span>
                                </p>
                                <div className="my-5 flex flex-wrap items-center space-x-5">
                                    <div>
                                        <Score score={90} size="xl" />
                                    </div>
                                    {Array(4).fill(1).map((item, index) => (
                                        <div className="rounded-full p-6 bg-sky-900 relative pointer">
                                            <ListOutlinedIcon className="absolute block top-1/2 left-1/2 translate--1/2 text-white"/>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white text-xl pb-3 font-medium">Overview</p>
                                    <p className="text-white mb-5">The Reyes-Elizondo's idyllic lives are shattered by a murder charge against Eric and León.</p>
                                    <p className="text-white text-lg">Julio Jiménez</p>
                                    <p className="text-white text-sm font-medium">Creator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="c-container">
            <div className="mt-8 w-4/5">
                <h3 className="text-xl mb-6">Series Cast</h3>
                <Flickity options={flickityOptions}>
                {Array(10).fill(1).map((item, index)=>(
                    <div className="px-2" key={index}>
                        <CardActor key={index} />
                    </div>
                ))}
                </Flickity>
                
                <TabMedia />    
            </div>
            <div className="mt-8 w-1/5">

            </div>
        </div>

    </>
  )
}

export default Detail