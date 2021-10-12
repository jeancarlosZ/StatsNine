import React from 'react'
import { getStarColor } from '../../../../utils'
import Star from '../../../../assets/icons/star'

//* Func to get a metric item, and the star related to it
export function getMetricItem(metric, rating) {
  return (
    <div className="metric-item">
      <Star className="metric-star" fill={getStarColor(rating)} />
      <span className="king">{metric}</span>
    </div>
  )
}

//* Function to get the table data
export function getTableDatas(arr, formatFunc, className) {
  return arr.map((x, i) => (
    <td className={className} key={i}>
      {formatFunc(x)}
    </td>
  ))
}
