import React, { useMemo, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import moment from "moment"
import Flickity from "react-flickity-component"

import { useGetPersonDetailQuery } from "../../services/movieApi"
import Loading from "../../components/Loading"
import { PersonActivity } from "../../containers/person"
import { Image } from '../../containers/utilities'
import SeconMenu from "../../components/SeconMenu"
import menu from './configMenu'

const flickityOptions = {
  initialIndex: 0,
  pageDots: false,
  prevNextButtons: false,
  freeScroll: true,
  contain: true,
}

const KnownForItem = ({item}) => {
  const name = item.title || item.name
  const link = item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`
  return (
    <div
      className="px-2 w-[175px]"
    >
      <Image
        size={200}
        src={item.poster_path}
        alt={item.title}
        ratio={150}
        className="w-full rounded-lg mb-2 block"
      />
      <p className="text-gray-700 text-sm text-center px-1">
        <Link to={link}>
          {name}
        </Link>
      </p>
    </div>
  )
}

const Main = () => {
  const { id: idPerson } = useParams()
  const { data, isFetching } = useGetPersonDetailQuery(
    {
      id: idPerson,
    },
    {
      skip: idPerson ? false : true,
    }
  )
  useEffect(() => {
    if(!(data?.name)) return;
    document.title = data.name
  }, [data?.name])
  const { data: credits } = useGetPersonDetailQuery(
    {
      id: idPerson,
      type: "combined_credits",
    },
    {
      skip: idPerson ? false : true,
    }
  )

  const knownFor = useMemo(() => {
    if (!(credits?.cast?.length > 0)) return []
    let result = [...credits.cast]
    result.sort((a, b) => {
      return b.vote_average - a.vote_average
    })
    return result.slice(0, 10)
  }, [credits])

  return (
    <>
      <SeconMenu menu={menu(idPerson)} />
      <div className="c-container mb-10 pt-10">
        {isFetching ?? <Loading />}

        {!isFetching && data && (
          <div className="flex flex-wrap">
            <div className="xl:w-1/5 w-full lg:w-1/4 mb-8 lg:mb-0">
              <Image
                className="rounded-lg w-full block mb-4"
                ratio={150}
                src={data.profile_path}
                alt={data.name}
                title={data.name}
              />
              <div className="space-x-2 mb-4">
                <a href="/">
                  <TwitterIcon />
                </a>
                <a href="/">
                  <InstagramIcon />
                </a>
              </div>

              <div className="">
                <p className="text-xl font-bold">Personal Info</p>
                <div className="mb-3">
                  <p className="text-md font-semibold">Known For</p>
                  <p className="text-md text-gray-600">
                    {data.known_for_department}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-md font-semibold">Known Credits</p>
                  <p className="text-md text-gray-600">123</p>
                </div>
                <div className="mb-3">
                  <p className="text-md font-semibold">Gender</p>
                  <p className="text-md text-gray-600">
                    {data.gender === 1 ? "Female" : "Male"}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-md font-semibold">Birthdate</p>
                  <p className="text-md text-gray-600">
                    {data.birthday} (
                    {moment(data.birthday, "YYYY-MM-DD").fromNow()})
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-md font-semibold">Place of Birth</p>
                  <p className="text-md text-gray-600">{data.place_of_birth}</p>
                </div>
                <div className="mb-3">
                  <p className="text-md font-semibold">Also Known As</p>
                  {data?.also_known_as?.map((item) => (
                    <p
                      key={item}
                      className="text-md text-gray-600"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="xl:w-4/5 lg:pl-10 w-full lg:w-3/4">
              <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
              <p className="text-xl font-semibold mb-2">Biography</p>
              <p className="text-sm mb-3">{data.biography}</p>
              <p className="text-xl font-semibold mb-2">Known For</p>
              <Flickity options={flickityOptions}>
                {knownFor.map((item, index) => (
                  <KnownForItem
                    item={item}
                    key={index}
                  />
                ))}
              </Flickity>
              <PersonActivity idPerson={idPerson} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Main
