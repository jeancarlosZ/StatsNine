import React, { useState } from 'react'
import { useLocation } from 'react-router'
import Subheader from '../../Subheader'
import MetricSelector from './MetricSelector'
import Metrics from './subpages/Metrics'

export default function KeyMetrics() {
  const location = useLocation()
  const selected = location.pathname.split('/').pop().toLowerCase()

  return (
    <>
      <Subheader />
      <div className="key-metrics-container">
        <div className="sub-container shadow-deep-nohover">
          <MetricSelector />
          <div>{getCorrectPage}</div>
        </div>
      </div>
    </>
  )
}

//* Function used to return/render the correct page
function getCorrectPage(selected) {
  switch (selected) {
    default:
      return <Metrics />
  }
}
