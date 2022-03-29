import React, { useContext, useMemo, useState } from 'react'
import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery, getImage } from '../../services/movieApi'
import Container from '../../components/Container'
import Card from '../../components/Card'
import isoConv from "iso-language-converter"

import CardMui from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
const PostersPage = () => {
    const { movieId, data: movieData, isFetching: isFetchingMovie } = useContext(movieContext)
    const { data, isFetching: isFetchingImages } = useGetMoviesQuery({
        id: movieId,
        type: "images"
    }, {
        skip: !movieId
    })
    const [ active, setActive ] = useState('null');
    const posters = data?.posters || [];

    const language = useMemo(() => {
        let result = [];
        result = posters.reduce((reduce, item) => {
            let lang = item.iso_639_1 || "null";
            if(!(lang in reduce)) reduce[lang] = {
                code: lang,
                items: [],
                label: lang === 'null' ? "No Language" : (isoConv(lang) || `(${lang})`)
            }

            reduce[lang].items.push(item)
            return reduce;
        }, {})

        return result
    }, [ posters ])
  return (
    <Container>
        <Container.Wrap>
            <Container.Sidebar>
                <Card
                  name="posters"
                  headerClass="font-bold"
                >
                    {Object.keys(language).map(key => (
                        <Card.Item
                          key={key}
                          active={key === active}
                        >
                            <button onClick={() => setActive(key)}>{language[key].label}</button>
                            <span className="">{language[key].items.length}</span>
                        </Card.Item>
                    ))}
                </Card>
            </Container.Sidebar>
            <Container.Main>
                <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
                {language[active] && language[active].items.map((item, index) => (
                    <CardMui >
                        <CardMedia
                          component="img"
                          height={item.height}
                          image={getImage(item.file_path)}
                          alt="green iguana"
                        />
                        <CardContent>
                            <p className="text-sm flex justify-between"><span className="font-semibold">Size:</span> 
                                <a
                                  href={getImage(item.file_path)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm"
                                >
                                    {`${item.width}x${item.height}`}
                                </a> 
                            </p>
                            <p className="text-sm flex justify-between"><span className="font-semibold">Vote:</span> <span>{Math.round(item.vote_average * 10)}%</span></p>
                            <p className="text-sm flex justify-between"><span className="font-semibold">Vote count:</span> <span>{item.vote_count}</span></p>
                        </CardContent>
                    </CardMui>
                ))}
                </div>

            </Container.Main>
        </Container.Wrap>
    </Container>
  )
}

export default () => (
    <Layout>
        <PostersPage />
    </Layout>
)