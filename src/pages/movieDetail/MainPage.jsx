import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import TopBillCast from './TopBillCast';
import SeconMenu from '../../components/SeconMenu';
import { useGetMoviesQuery } from '../../services/movieApi';
import Banner from './Banner';
import { TabMedia } from '../../containers/Tabs'



const MainPage = () => {
    const { id: movieId } = useParams();
    return (
        <>
            <SeconMenu/>
            <Banner movieId={movieId} />
            <div className="c-container">
                <div className="mt-8 w-4/5">
                    <TopBillCast movieId={movieId} />
                    <TabMedia movieId={movieId} />    
                </div>
                <div className="mt-8 w-1/5">

                </div>
            </div>
        </>
    )
}

export default MainPage