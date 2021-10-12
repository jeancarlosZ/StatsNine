import { getStarColor } from '../../../../utils'

//* Func to get a metric item, and the star related to it
export function getMetricItem(metric, rating) {
  return (
    <div className="metric-item">
      <Star className="metric-star" fill={getStarColor(rating)} />
      <span className="king">{metric}</span>
    </div>
  )
}
