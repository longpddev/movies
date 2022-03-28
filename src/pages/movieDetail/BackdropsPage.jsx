import React, { useContext } from 'react'
import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
import { Image } from '../../containers/utilities'
import Container from '../../components/Container'
import Card from '../../components/Card'

const BackdropsPage = () => {
    const { movieId, data: movieData, isFetching: isFetchingMovie } = useContext(movieContext)
    const { data, isFetching: isFetchingImages } = useGetMoviesQuery({
        id: movieId,
        type: "images"
    }, {
        skip: !movieId
    })

    const backdrops = data?.backdrops || [];
    console.log(backdrops)
  return (
    <Container>
        <Container.Wrap>
            <Container.Sidebar>
                <Card
                  name="Backdrops"
                  headerClass="font-bold"
                >
                    <Card.Item></Card.Item>
                </Card>
            </Container.Sidebar>
            <Container.Main>

            </Container.Main>
        </Container.Wrap>
    </Container>
  )
}

export default () => (
    <Layout>
        <BackdropsPage />
    </Layout>
)