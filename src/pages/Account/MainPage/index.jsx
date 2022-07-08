import React from 'react'
import Section from '../components/Section'
import { Bar, Doughnut } from 'react-chartjs-2';
import CartHorizon from '../components/CartHorizon';

const labels = Array(10).fill(1).map((_,index) => index+1);

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const optionsDoughnut = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
    },
  },
}

export const dataDoughnut  = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const MainPage = () => {
  return (
    <div className="c-container my-4">
      <Section label="Stats">
        <div className="flex">
          <div className="w-2/12">
            <p className="text-lg">Total Edits</p>
            <p className="text-5xl font-bold text-violet-600">
              1
            </p>
          </div>
          <div className="w-2/12">
            <p className="text-lg">Total Edits</p>
            <p className="text-5xl font-bold text-violet-600">
              8
            </p>
          </div>
          <div className="w-4/12 max-w-[200px] mr-auto">
            <p className="text-lg">Rating Overview</p>
            <Bar
              options={options}
              data={data}
            />
          </div>
          <div className="w-4/12 max-w-[200px] mr-auto">
            <p className="text-lg">Most Watched Genres</p>
            <Doughnut
              options={optionsDoughnut}
              data={dataDoughnut}
            />
          </div>
        </div>
      </Section>
      <Section label="Upcoming From Watchlist">
        <CartHorizon />
      </Section>
      <Section label="Recent Discussions">
        <p>You haven't made any recent edits.</p>
      </Section>
      <Section label="Recent Activity">
        <p>You haven't made any recent edits.</p>
      </Section>
    </div>
  )
}

export default MainPage