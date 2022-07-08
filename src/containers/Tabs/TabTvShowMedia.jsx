import React, { useState } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
import { useGetTvShowQuery } from "../../services/movieApi"
import Tabs from "../../components/Tabs/Tabs"
import DialogVideo from '../../components/DialogVideo';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css"
import { Image } from '../utilities'
import Fetching from '../../components/Fetching';
import ImageComponent from '../../components/Image'
const flickityOptions = {
  initialIndex: 0,
  pageDots: false,
  prevNextButtons: false,
  freeScroll: true,
  contain: true,
  cellAlign: 'left'
}

const TabTvShowMedia = ({ tvShowId }) => {
  const [tabActive, setTabActive] = useState("videos")
  let prepareType = tabActive;
  switch(tabActive) {
    case "backdrops":
    case "posters":
      prepareType = 'images'
      break;
    default: 
      break;
  }
  const { data, isFetching } = useGetTvShowQuery(
    {
      type: prepareType,
      id: tvShowId,
    },
    {
      skip: !tvShowId,
    }
  )
    console.log(data)
  const EmptyData = <div className="min-h-[50px] flex items-center">
    <h2 className="font-semibold text-xl text-gray-500">Empty...</h2>
  </div>
  return (
    <Tabs onChange={(value) => setTabActive(value)}>
        <div className="flex space-x-4">
          <h3 className="text-xl mr-6 py-1 font-bold">Media</h3>
          <Tabs.Header>
            <Tabs.Label
              title="Videos"
              isDefault
              value="videos"
            />
            <Tabs.Label
              title="Backdrops"
              value="backdrops"
            />
            <Tabs.Label
              title="Posters"
              value="posters"
            />
          </Tabs.Header>
        </div>
        <Tabs.Body className="py-3">
          <Tabs.Item value="videos">
            <Fetching 
              data={data?.results?.length > 0}
              isFetching={isFetching}
              notFound={EmptyData}
              render={() => (
                  <Flickity options={flickityOptions}>
                  {data.results.filter(item => item.site === 'YouTube').slice(0,10).map((item) => (
                      <div
                        className="relative min-w-[400px]"
                        key={item.id}
                      >
                        <ImageComponent
                          ratio="56.25"
                          className=" object-center object-cover"
                          src={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                          alt=""
                        />
                        <div className="absolute-center inset-0 bg-black w-full h-full opacity-30"></div>
                        <DialogVideo
                          code={item.key}
                          wrapClass="absolute-center pointer hover:scale-150 transition"
                        >
                          <PlayCircleOutlineIcon
                            className="absolute-center"
                            sx={{fontSize: "40px", color: "white"}}
                          />
                        </DialogVideo>
                      </div>
                  ))}
                </Flickity>
                )}
            />
          </Tabs.Item>
          <Tabs.Item value="backdrops">
            <Fetching 
              data={data?.backdrops?.length > 0}
              isFetching={isFetching}
              notFound={EmptyData}
              render={() => (
                <Flickity options={flickityOptions}>
                  {data.backdrops.slice(0, 10).map((item, index) => (
                    <Image
                      key={index}
                      src={item.file_path}
                      alt="backdrops"
                      className="max-w-[500px] w-full"
                    />
                  ))}
                </Flickity>
              )}
            />
          </Tabs.Item>
          <Tabs.Item value="posters">
            <Fetching 
              data={data?.posters?.length > 0}
              isFetching={isFetching}
              notFound={EmptyData}
              render={() => (
                  <Flickity options={flickityOptions}>
                    {data.posters.slice(0, 10).map((item, index) => (
                      <div
                        className="max-w-[250px] w-full"
                        key={index}
                      >
                        <Image
                          src={item.file_path}
                          alt="posters"
                          ratio={133}
                        />
                      </div>
                    ))}
                  </Flickity>
                )}
            />
          </Tabs.Item>
        </Tabs.Body>
      </Tabs>
  )
}

export default TabTvShowMedia
