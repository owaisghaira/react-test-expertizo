import React from 'react'

const TopBar = ({progressBar}) => {
  return (
    <div className="progress">
    <div
      className="progress-bar"
      role="progressbar"
      style={{ width: `${progressBar()}%` }}
      aria-valuenow={100}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
  )
}

export default TopBar