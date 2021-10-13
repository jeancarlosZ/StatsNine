import React, { useEffect, useState } from 'react'
import Star from '../../assets/icons/star'
import { getTickerResults } from '../../store/local/localActions'
import { getStarColor } from '../../utils'

export default function OverallDetermination(props) {
  const symbol = props.symbol
  const [results, setResults] = useState({})

  useEffect(() => {
    async function getData() {
      //* Get the metric results (to color stars)
      setResults(await getTickerResults())
    }
    getData()
  }, [symbol])

  return (
    <div className="overviewbox overall-determination shadow-nohover">
      <div className="headerTwo">Overall Determination</div>
      <div className="star-container flex-row justify-around justify-center">
        <StarsContainer results={results} />
        <div className="description-text determination">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text.
        </div>
      </div>
      <div className="description-text ending-text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
    </div>
  )
}

function StarsContainer({ results }) {
  if (!results) return
  return (
    <div className="stars-container flex-row justify-evenly">
      <div className=" star-col flex-col justify-evenly">
        <MetricStar rating={results.revgrowth} />
        <MetricStar rating={results.cashgrowth} />
        <MetricStar rating={results.netincome} />
      </div>
      <div className=" star-col flex-col justify-evenly">
        <MetricStar rating={results.roic} />
        <MetricStar rating={results.shares} />
        <MetricStar rating={results.assets} />
      </div>
      <div className=" star-col flex-col justify-evenly">
        <MetricStar rating={results.pe} />
        <MetricStar rating={results.pfcf} />
        <MetricStar rating={results.ltl} />
      </div>
    </div>
  )
}

// function Star(props) {
//   return <div style={{ backgroundColor: props.color }} className="star"></div>;
// }

// TODO: Pass in the metric info to color the stars correctly
function MetricStar({ rating }) {
  return (
    <div className="star">
      <Star className="metric-star" fill={getStarColor(rating)} />
    </div>
  )
}
