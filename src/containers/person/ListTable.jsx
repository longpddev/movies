import React from 'react'
import { NavLink } from 'react-router-dom';

const ListTable = ({group = {}}) => {
  let getYear = Object.keys(group);
  getYear.sort((a, b) => b - a);
  return (
    <table className="border border-gray-300 shadow-lg w-full border-collapse">
        <tbody>
            {getYear.map((year) => (
              <tr className="p-2 " key={year}>
                  <td className="border-0">
                    <table className="py-2 w-full border-collapse border-b border-gray-300">
                      <tbody>
                        {group[year].map(item => (
                          <tr key={item.id}>
                            <td className="p-2">{year}</td>
                            <td>
                              <button className="c-dot"></button>
                            </td>
                            <td className="p-2">
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