import React, { useContext, useMemo, useState } from 'react'
import moment from 'moment'

import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
import Container from '../../components/Container'
import Card from '../../components/Card'
import DialogVideo from '../../components/DialogVideo'
import Image from '../../components/Image'
import CardMui from '@mui/material/Card';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const VideoPage = () => {
    const { movieId } = useContext(movieContext)
    const { data: videos } = useGetMoviesQuery({
        id: movieId,
        type: "videos"
    }, {
        skip: !movieId
    })
    
    const [ active, setActive ] = useState(null);

    const group = useMemo(() => {
        if(!(videos?.results.length > 0)) return {};

        return videos.results.reduce((reduce, item) => {
            if(!(item.type in reduce)) {
                reduce[item.type] = [];
            }

            reduce[item.type].push(item);

            return reduce
        }, {})
    }, [videos?.results])
  return (
    <Container>
        <Container.Wrap>
            <Container.Sidebar>
                <Card
                  name="posters"
                  className="snap"
                  headerClass="font-bold"
                >
                    {Object.keys(group).map((key, index) => (
                        <Card.Item
                          key={key}
                          active={active === null ? index === 0 : key === active}
                        >
                            <button onClick={() => setActive(key)}>{key}</button>
                            <span className="">{group[key].length}</span>
                        </Card.Item>
                    ))}
                </Card>
            </Container.Sidebar>
            <Container.Main>
                {(group[active] || group[Object.keys(group)[0]] || []).map(item => (
                    <CardMui className="mb-4">
                        <div className="flex">
                            <div className="w-1/3">
                                <DialogVideo
                                  wrapClass="relative"
                                  code={item.key}
                                >
                                     <Image
                                       ratio={55}
                                       className="object-center object-cover"
                                       src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
                                       alt="green iguana"
                                     />
                                    <div className="absolute-center pointer transition hover:scale-150 ">
                                    <PlayCircleOutlineIcon
                                      className="absolute-center"
                                      sx={{fontSize: "50px", color: "white"}}
                                    />
                                    </div>
                                </DialogVideo>
                            </div>
                            <div className="w-2/3 flex flex-col justify-between pl-4">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm">{moment(new Date(item.published_at)).format('DD MMMM YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    </CardMui>
                ))}
            </Container.Main>
        </Container.Wrap>
    </Container>
  )
}

export default () => (
    <Layout>
        <VideoPage />
    </Layout>
)