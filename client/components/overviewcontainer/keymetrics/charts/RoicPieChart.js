import React from 'react'
import UniversalChart from '../../../UniversalChart'

export default function ROICPieChart({ data, label }) {
  const percent = data ? data : {}

  const dataset = []

  //* If we have the data
  if (percent) {
    dataset.push({
      fullSet: {
        name: 'FCF % LTL',
        type: 'pie',
        labels: ['ROIC', 'POTENTIAL'],
        marker: {
          colors: ['rgba(38, 197, 217, .6)', 'rgba(250, 173, 20, .7)']
        },
        values: [percent * 100, 100],
        hoverinfo: 'label+percent'
      }
    })
  }

  //* Return the chart
  return (
    <div className="roic-chart">
      <div className="roic-selector">
        <label>{label}</label>
        <label>ROIC</label>
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-roic-chart"
          // keys={keys}
          dataset={dataset}
          showlegend={false}
          margin={{ l: 0, r: 0, b: 0, t: 0 }}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </div>
  )
}
