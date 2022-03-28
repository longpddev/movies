import React, { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import millify from "millify"
import isoConv from "iso-language-converter"

import TopBillCast from "./TopBillCast"
import Recommendations from "./Recommendations"
import { useGetMoviesQuery } from "../../services/movieApi"
import Banner from "./Banner"
import { TabMedia } from "../../containers/Tabs"
import Fetching from "../../components/Fetching"
import Container from "../../components/Container"
import Tag from '../../components/Tag'
import Layout, { movieContext } from './Layout'
const MainPage = () => {
  const { movieId, data, isFetching } = useContext(movieContext)
  console.log(useContext(movieContext))
  const { data: keywords } = useGetMoviesQuery({
    type: "keywords",
    id: movieId,
  }, {
    skip: !movieId,
  })

  return (
    <>
      <Banner movieId={movieId} />
      <Fetching
        isFetching={isFetching}
        data={data}
        notFound={
          <div className="min-h-[300px] flex justify-center items-center">
            <h2 className="text-center text-2xl font-semibold">
              Sorry we can't find the movie
            </h2>
          </div>
        }
        render={() => (
          <Container>
            <Container.Wrap>
              <Container.Main side="left">
                <TopBillCast movieId={movieId} />
                <div className="my-8">
                  <TabMedia movieId={movieId} />
                </div>
                <div className="my-8">
                  <Recommendations movieId={movieId} />
                </div>
              </Container.Main>
              <Container.Sidebar>
                <Content title="Facts">
                  <p>{}</p>
                </Content>
                <Content title="Status">
                  <p>{data.status}</p>
                </Content>
                <Content title="Original Language">
                  <p>{isoConv(data.original_language)}</p>
                </Content>
                <Content title="Budget">
                  <p>{millify(data.budget, {space: true})}</p>
                </Content>
                <Content title="Revenue">
                  <p>{millify(data.revenue, {space: true})}</p>
                </Content>
                <Content title="Keywords">
                <ul className="flex flex-wrap ">
                  {keywords?.keywords?.map(item => (
                    <li
                      key={item.id}
                      className="mr-2 mt-2"
                    >
                      <Link
                        to="#"
                      >
                        <Tag>
                          {item.name}
                        </Tag>
                      </Link>
                    </li>
                  ))}
                  </ul>
                </Content>
              </Container.Sidebar>
            </Container.Wrap>
          </Container>
        )}
      />
    </>
  )
}

const Content = ({children, title}) => (<div className="mb-4">
  <p className="font-semibold">{title}</p>
  {children}
</div>)


export default () => (
  <Layout main>
    <MainPage />
  </Layout>
)
