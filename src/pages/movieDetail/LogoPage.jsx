import React, { useContext } from 'react'
import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
import { Image } from '../../containers/utilities'
const LogoPage = () => {
    const { movieId, data: movieData, isFetching: isFetchingMovie } = useContext(movieContext)
    const { data: credits, isFetching: isFetchingCredits } = useGetMoviesQuery({
        id: movieId,
        type: "credits"
    }, {
        skip: !movieId
    })
  return (
    <div>LogoPage</div>
  )
}

export default () => (
    <Layout>
        <LogoPage />
    </Layout>
)