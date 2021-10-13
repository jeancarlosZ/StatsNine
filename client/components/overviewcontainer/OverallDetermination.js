import React, { useEffect, useState } from 'react'
import Star from '../../assets/icons/star'
import { getTickerResults } from '../../store/local/localActions'
import { getStarColor } from '../../utils'

export default function OverallDetermination(props) {
  const symbol = props.symbol
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      //* Get the metric results (to color stars)
      try {
        setResults(await getTickerResults())
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [symbol])

  return (
    <div className="overviewbox overall-determination shadow-nohover">
      <div className="headerTwo">Overall Determination</div>
      <div className="star-container flex-row justify-around justify-center">
        <StarsContainer results={results} loading={loading} />
        <ODMessage results={results} loading={loading} />
      </div>
    </div>
  )
}

function StarsContainer({ results, loading }) {
  if (loading) {
    return <></>
  } else {
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
}

// Pass in the metric info to color the stars correctly
function MetricStar({ rating }) {
  return (
    <div className="star">
      <Star className="overview-metric-star" fill={getStarColor(rating)} />
    </div>
  )
}

function ODMessage({ results, loading }) {
  function recommendation(score) {
    if (score <= 20) {
      return 'BAD'
    } else if (score <= 40) {
      return 'POOR'
    } else if (score <= 60) {
      return 'FAIR'
    } else if (score <= 80) {
      return 'GOOD'
    } else {
      return 'EXCELLENT'
    }
  }

  if (loading) {
    return <></>
  } else {
    return (
      <div className="description-text determination">
        {`We have concluded that ${results.symbol} is an overall ${recommendation(
          results.score
        )} investment and has achieved a total of
        ${results.score}/100 points!`}
      </div>
    )
  }
}
