import React from 'react'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'
import Score from '../../components/Score'
import SeconMenu from '../../components/SeconMenu'
import menu from './configMenu'

import MainPage from './MainPage'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const bg_image = 'https://www.themoviedb.org/assets/2/v4/account_pipes/purple-63b164a075461641b7ef444ea97d9787adf45a9552fe215e20063e3ff02491a8.svg'

const Account = () => {
  const { pathname } = useLocation()
  return (
    <>
      <div
        style={{
          background: "radial-gradient(at 30% top, #20284a 0%, rgba(3,37,65, 1) 70%)",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bg_image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className="c-container py-6 flex flex-col sm:flex-row"
          >
            <div className=" hidden sm:flex w-32 h-32 text-5xl items-center justify-center rounded-full bg-violet-600 text-white uppercase text-center mr-10">
              <span className="pb-2">l</span>
            </div>
            <div className="flex justify-center flex-col">
              <div className='mb-2'> 
                <span className="text-3xl font-bold text-white">longpd</span>&nbsp;&nbsp;&nbsp;
                <span className="text-white opacity-80 font-weight">Member since March 2022</span>
              </div>
              <div className="flex flex-wrap">
                <div className="flex items-center">
                  <Score
                    size='xl'
                    score={60}
                  />
                  <div className='text-white ml-3 leading-5 pr-6 mr-6 md:border-r md:border-white whitespace-nowrap'>
                    Average<br/>
                    Movie Score
                  </div>
                </div>
                <div className="flex items-center">
                  <Score
                    size='xl'
                    score={60}
                  />
                  <div className='text-white ml-3 leading-5  whitespace-nowrap'>
                    Average<br/>
                    TV Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SeconMenu menu={menu(pathname)} />
      <Routes>
        <Route
          index
          element={<MainPage />}
        />
      </Routes>
    </>
  )
}

export default Account