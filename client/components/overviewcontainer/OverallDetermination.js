import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Star from '../../assets/icons/star'
import { getTickerResults } from '../../store/local/localActions'
import { getStarColor } from '../../utils'

export default function OverallDetermination({ symbol }) {
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

// This function returns the layout container for the 9 stars.
function StarsContainer({ results, loading }) {
  const history = useHistory()
  if (loading) {
    return (
      <div className="stars-container flex-row justify-evenly">
        <div>Loading...</div>
      </div>
    )
  } else {
    const link = '/overviewpage/keymetrics'
    return (
      <div className="stars-container flex-row justify-evenly">
        <div className=" star-col flex-col justify-evenly">
          <div onClick={() => history.push(link + '/growth')}>
            <MetricStar rating={results.revgrowth} metric="Revenue Growth" />
          </div>
          <div onClick={() => history.push(link + '/growth')}>
            <MetricStar rating={results.cashgrowth} metric="Free Cash Flow Growth" />
          </div>
          <div onClick={() => history.push(link + '/growth')}>
            <MetricStar rating={results.netincome} metric="Net Income Growth" />
          </div>
        </div>
        <div className=" star-col flex-col justify-evenly">
          <div onClick={() => history.push(link + '/quality')}>
            <MetricStar rating={results.roic} metric="Return on Invested Capital" />
          </div>
          <div onClick={() => history.push(link + '/quality')}>
            <MetricStar rating={results.shares} metric="Shares Outstanding" />
          </div>
          <div onClick={() => history.push(link + '/safety')}>
            <MetricStar rating={results.assets} metric="Assets vs. Liabilities" />
          </div>
        </div>
        <div className=" star-col flex-col justify-evenly">
          <div onClick={() => history.push(link + '/price')}>
            <MetricStar rating={results.pe} metric="Price to Earnings Ratio" />
          </div>
          <div onClick={() => history.push(link + '/price')}>
            <MetricStar rating={results.pfcf} metric="Price to Free Cash Flow Ratio" />
          </div>
          <div onClick={() => history.push(link + '/safety')}>
            <MetricStar rating={results.ltl} metric="Free Cash Flow to Long Term Debt" />
          </div>
        </div>
      </div>
    )
  }
}

// Pass in the metric info to color the stars correctly and render the stars
function MetricStar({ rating, metric }) {
  return (
    <div className="star tooltips">
      <Star className="overview-metric-star" fill={getStarColor(rating)} />
      <h5 className="tooltiptext">{metric}</h5>
    </div>
  )
}

// This function renders the recommendation based on the score for each stock.
function ODMessage({ results, loading }) {
  function recommendation(score) {
    const starRep = 11.11
    if (score <= 4 * starRep) {
      return 'BAD'
    } else if (score <= 5 * starRep) {
      return 'POOR'
    } else if (score <= 6 * starRep) {
      return 'FAIR'
    } else if (score <= 8 * starRep) {
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
        {/* {`We have concluded that ${results.symbol} is an overall ${recommendation(
          results.score
        )} investment and has achieved a total of
        ${results.score}/100 points!`} */}
        {`According to our 9 key metrics, ${results.symbol} get an overall ${recommendation(
          results.score
        )} rating! The company has achieved a total ${results.score}/100 score!`}
      </div>
    )
  }
}
