import React from 'react'
import Subheader from '../../Subheader'
import MetricSelector from './MetricSelector'

export default function KeyMetrics() {
  return (
    <>
      <Subheader />
      <div className="key-metrics-container">
        <div className="sub-container shadow-deep-nohover">
          <MetricSelector />
          <div></div>
        </div>
      </div>
    </>
  )
}
