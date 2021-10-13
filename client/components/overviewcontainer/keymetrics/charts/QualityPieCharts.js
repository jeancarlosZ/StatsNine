import React from 'react'
import UniversalChart from '../../../UniversalChart'

export default function QualityPieCharts({
  data,
  labels,
  upper,
  lower,
  colors = ['rgba(38, 197, 217, .6)', 'rgba(250, 173, 20, .7)'],
  margins = { l: 30, r: 30, b: 30, t: 10 }
}) {
  //* Percentage point
  const percent = data ? data : {}
  const dataset = []

  //* If we have the data
  if (percent) {
    dataset.push({
      fullSet: {
        name: 'FCF % LTL',
        type: 'pie',
        labels: labels,
        marker: {
          colors: colors
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
        {upper ? <span>{upper}</span> : <></>}
        <label>{lower}</label>
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-roic-chart"
          // keys={keys}
          dataset={dataset}
          showlegend={false}
          margin={margins}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </div>
  )
}
