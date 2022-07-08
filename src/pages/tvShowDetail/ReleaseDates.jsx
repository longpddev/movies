import React, { useContext, useMemo } from 'react'
import Layout, { tvShowContext } from './Layout'
import { useGetTvShowQuery, MEDIA_TYPE } from '../../services/movieApi'
import Container from '../../components/Container'
import Card from '../../components/Card'
import iso3166 from "iso-3166-1"
import moment from 'moment'

function handleScrollTo(element) {
    let id = element.getAttribute('href');
    if(!id) return;
    id = id.replace('#', '')
    const targetElement = document.getElementById(id);

    if(!targetElement) return;
    let heightNav = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    heightNav = heightNav.replace('px', '');
    window.scrollTo(0, targetElement.offsetTop - Number(heightNav))
}

const ReleaseDates = () => {
    const { tvShowId } = useContext(tvShowContext)
    const { data } = useGetTvShowQuery({
        id: tvShowId,
        type: "release_dates"
    }, {
        skip: !tvShowId
    })
    
    const group = useMemo(() => {
        if(!(data?.results.length > 0)) return [];

        return data.results;
    }, [ data?.results ])

    return (
        <Container>
            <Container.Wrap>
                <Container.Sidebar>
                    <Card
                      name="Release Dates"
                      className="snap"
                      headerClass="font-semibold"
                    >
                        {group.map((item, index) => (
                            <Card.Item key={index}>
                                <a
                                  className="pr-2 text-left"
                                  href={`#item-stt-${item.iso_3166_1}`}
                                  onClick={(e) => { e.preventDefault(); handleScrollTo(e.target) }}
                                >{iso3166.whereAlpha2(item.iso_3166_1).country}</a>
                                <span className="">{item.release_dates.length}</span>
                            </Card.Item>
                        ))}
                    </Card>
                </Container.Sidebar>
                <Container.Main>
                    {group.map((item, index) => (
                        <div
                          key={index}
                          id={`item-stt-${item.iso_3166_1}`}
                          className="border-t-0 rounded-md overflow-hidden border border-gray-300 shadow-lg mb-4"
                        >
                            <div
                              className="bg-gray-200 px-2 py-2 font-semibold flex items-center space-x-2"
                            >
                                <img
                                  src={`https://flagcdn.com/32x24/${item.iso_3166_1.toLowerCase()}.png`}
                                  width="25px"
                                  alt="flag"
                                />
                                <span>{iso3166.whereAlpha2(item.iso_3166_1).country}</span>
                            </div>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr>
                                        <th className="font-semibold text-left  px-2 py-2">Date</th>
                                        <th className="font-semibold text-left  px-2 py-2">Classification</th>
                                        <th className="font-semibold text-left  px-2 py-2">Type</th>
                                        <th className="font-semibold text-left  px-2 py-2">Language</th>
                                        <th className="font-semibold text-right px-2 py-2">Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.release_dates.map((release, i) => (
                                        <tr key={i}>
                                            <td className="text-left  px-2 py-2">{moment(new Date(release.release_date)).format('DD MMMM YYYY')}</td>
                                            <td className="text-left  px-2 py-2">{release.certification}</td>
                                            <td className="text-left  px-2 py-2">{MEDIA_TYPE[release.type]}</td>
                                            <td className="text-left  px-2 py-2">{release.iso_639_1}</td>
                                            <td className="text-right px-2 py-2">{release.note}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                        </div>
                    ))}
                </Container.Main>
            </Container.Wrap>
        </Container>
    )
}

export default () => (
    <Layout>
        <ReleaseDates />
    </Layout>
)