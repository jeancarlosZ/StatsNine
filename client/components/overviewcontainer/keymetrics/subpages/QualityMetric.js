import React from 'react'
import MetricSelector from '../MetricSelector'

export default function QualityMetric() {
  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container"></div>
        </div>
      </div>
    </div>
  )
}
