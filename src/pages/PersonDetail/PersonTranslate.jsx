import React, { useEffect } from "react"
import Container from "../../components/Container"
import Card from "../../components/Card"
import { useParams } from "react-router-dom"

import { useGetPersonDetailQuery } from "../../services/movieApi"
const PersonTranslate = () => {
  const { id: idPerson } = useParams()
  const { data } = useGetPersonDetailQuery(
    {
      id: idPerson,
      type: "translations",
    },
    {
      skip: !idPerson,
    }
  )

  useEffect(() => {
    if(!(data?.name)) return;
    document.title = data.name
  }, [data?.name])
  return (
    <Container>
      <Container.Wrap>
        <Container.Sidebar>
          <div className="flex w-full">
            <Card name="Translations">
              {data?.translations?.map((item, index) => (
                <Card.Item key={index}>
                  <span className="pointer">{item.name}</span>
                  <span className="px-3 rounded-full bg-gray-200">
                    {item.iso_639_1 + "-" + item.iso_3166_1}
                  </span>
                </Card.Item>
              ))}
            </Card>
          </div>
        </Container.Sidebar>
        <Container.Main>
          <div>
            {data?.translations?.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-lg border border-gray-300 shadow-md overflow-hidden mb-7"
              >
                <div className="bg-gray-100 px-2 py-2">
                  <span>{item.name} </span>
                  <span className="text-gray-400">
                    {item.iso_639_1 + "-" + item.iso_3166_1}
                  </span>
                </div>
                <div className="p-2 whitespace-pre-line">
                  {item.data.biography}
                </div>
              </div>
            ))}
          </div>
        </Container.Main>
      </Container.Wrap>
    </Container>
  )
}

export default PersonTranslate
