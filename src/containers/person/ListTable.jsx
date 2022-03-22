import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { MovieTooltip } from '../movie';
const ListTable = ({group = {}}) => {
  const [ tooltipShow, setTooltipShow ] = useState(false);
  let getYear = Object.keys(group);
  getYear.sort((a, b) => {
    if(a === '__') return -1;
    return b - a;
  });
  return (
    <table className="table-list">
        <tbody>
            {getYear.map((year) => (
              <tr className="p-2 tr-lv-1" key={year}>
                  <td className="border-0 ">
                    <table>
                      <tbody>
                        {group[year].map(item => (
                          <tr key={item.id}>
                            <td className="py-2 sm:px-4 px-2 sm:min-w-[5rem] text-center">{year}</td>
                            <td className="text-center sm:min-w-[2rem] py-2 sm:px-4 px-2">
                              <div className="flex"> 
                                <MovieTooltip
                                  movieId={item.id}
                                  open={item.id === tooltipShow}
                                >
                                  <button className="c-dot inline" onClick={() => {
                                    if(item.id === tooltipShow) return setTooltipShow(false);

                                    setTooltipShow(item.id)
                                  }}></button>
                                </MovieTooltip>
                              </div>
                            </td>
                            <td className="py-2 w-full">
                              <NavLink className="font-bold hover:text-sky-600" to={`/movie/${item.id}`}>{item.original_title}</NavLink>
                              <span className="text-sm text-gray-400"> as </span>
                              <span className="text-gray-500">{item.character}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
              </tr>
            ))}
        </tbody>
    </table>
  )
}

export default ListTable