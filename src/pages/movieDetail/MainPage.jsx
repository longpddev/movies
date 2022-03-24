import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import TopBillCast from './TopBillCast';
import SeconMenu from '../../components/SeconMenu';
import { useGetMoviesQuery } from '../../services/movieApi';
import Banner from './Banner';
import { TabMedia } from '../../containers/Tabs'
import Fetching from '../../components/Fetching';


const MainPage = () => {
    const { id: movieId } = useParams();
    const { data, isFetching } = useGetMoviesQuery({
        id: movieId
    }, {
        skip: !movieId
    })
    return (
        <>
            <SeconMenu/>
            <Fetching
                isFetching={isFetching}
                data={data}
                notFound={ <div className="min-h-[300px] flex justify-center items-center">
                    <h2 className="text-center text-2xl font-semibold">Sorry we can't find the movie</h2>
                </div> }
                render={() => (
                    <>
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
                )}
            />
        </>
    )
}

export default MainPage