import React from 'react'

const Section = ({
  children,
  label,
  labelRight
}) => {
  return (
    <div className='mb-3'>
      <h3 className="text-2xl font-bold mb-3 flex justify-between">{label}
        <div>
          {labelRight}
        </div>
      </h3>
      {children}
    </div>
  )
}

export default Section