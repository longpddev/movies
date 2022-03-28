import React, { useContext } from 'react'
import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
import { Image } from '../../containers/utilities'
const PostersPage = () => {
    const { movieId, data: movieData, isFetching: isFetchingMovie } = useContext(movieContext)
    const { data: credits, isFetching: isFetchingCredits } = useGetMoviesQuery({
        id: movieId,
        type: "credits"
    }, {
        skip: !movieId
    })
  return (
    <div>PostersPage</div>
  )
}

export default () => (
    <Layout>
        <PostersPage />
    </Layout>
)