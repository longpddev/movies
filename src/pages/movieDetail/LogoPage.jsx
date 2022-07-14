import React, { useContext } from 'react'
import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
const LogoPage = () => {
    const { movieId } = useContext(movieContext)
    const { data: credits } = useGetMoviesQuery({
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