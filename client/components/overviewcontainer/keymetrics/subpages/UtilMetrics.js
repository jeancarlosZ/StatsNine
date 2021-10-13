import React from 'react'
import { getStarColor } from '../../../../utils'
import Star from '../../../../assets/icons/star'

//* Func to get a metric item, and the star related to it
export function getMetricItem(metric, rating, colored = true) {
  return (
    <div className="metric-item">
      <Star className="metric-star" fill={getStarColor(rating)} />
      <span className={colored ? 'king' : ''}>{metric}</span>
    </div>
  )
}

//* Function to get the table data
export function getTableDatas(arr, formatFunc, className, args) {
  return arr.map((x, i) => (
    <td className={className} key={i}>
      {args ? formatFunc(x, ...args) : formatFunc(x)}
    </td>
  ))
}
