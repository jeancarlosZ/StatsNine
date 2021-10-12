import React from 'react'
import MetricSelector from '../MetricSelector'

export default function QualityMetric() {
  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container quality-subcontainer">
            <div className="qualityhalf upper">{getQualityHalfOne()}</div>
            {/* <div className="qualityhalf lower"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to get the top half of the quality
//* Metrics page
function getQualityHalfOne() {
  return (
    <>
      <div className="quality-chart">
        {/* Chart 1 */}
        {/* Chart 2 */}
      </div>
      <div className="metric-roic">
        {/* Get Metric */}
        {/*  */}
      </div>
      <div></div>
    </>
  )
}
