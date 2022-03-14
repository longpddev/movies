import React from 'react'
import clsx from 'clsx';

const TabBar = ({tabs, setActiveTab, activeTab}) => {
  return (
    <div className="w-full mb-4 md:mb-0 md:w-1/4">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="py-3 px-4 bg-sky-400 text-white text-xl font-weight">
                <span>Search Results</span>
            </div>
            <ul className="pt-2">
                {tabs.map((item, index) => (
                    <li 
                    className={clsx('py-2 px-4 hover:bg-gray-300 hover:font-weight pointer flex justify-between',{
                        'bg-gray-300': index === activeTab
                    })}
                    onClick={() => setActiveTab(index)}
                    >
                        <span>{item.name}</span>
                        <span className="rounded-lg px-2 bg-gray-200 pt-px text-sm text-gray-700">{item?.total_results || 0}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TabBar