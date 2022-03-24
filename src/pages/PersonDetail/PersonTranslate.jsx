import React from 'react'
import Container from '../../components/Container'
import { useParams } from 'react-router-dom'

import { useGetPersonDetailQuery } from '../../services/movieApi'
const PersonTranslate = () => {
  const { id: idPerson } = useParams()
  const { data, isFetching } = useGetPersonDetailQuery(
    {
      id: idPerson,
      type: 'translations',
    },
    {
      skip: !idPerson,
    }
  )
  return (
    <Container.Body>
      <Container.Wrap>
        <Container.Sidebar>
          <div className="flex w-full">
            <div className="w-full rounded-lg border border-gray-300 shadow-md overflow-hidden">
              <h2 className="text-white text-2xl font-bold text-center bg-sky-400 px-2 py-4">
                Translations
              </h2>
              <ul className="my-2">
                {data?.translations?.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-3 py-2 hover:bg-gray-300"
                  >
                    <span className="pointer">{item.name}</span>
                    <span className="px-3 rounded-full bg-gray-200">
                      {item.iso_639_1 + '-' + item.iso_3166_1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
                    {item.iso_639_1 + '-' + item.iso_3166_1}
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
    </Container.Body>
  )
}

export default PersonTranslate
