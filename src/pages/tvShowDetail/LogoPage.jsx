import React, { useContext } from 'react'
import Layout, { tvShowContext } from './Layout'
import { useGetTvShowQuery } from '../../services/movieApi'
const LogoPage = () => {
    const { tvShowId } = useContext(tvShowContext)
    const { data: credits } = useGetTvShowQuery({
        id: tvShowId,
        type: "credits"
    }, {
        skip: !tvShowId
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