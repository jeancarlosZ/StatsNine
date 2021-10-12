import React, { useEffect, useState } from 'react'
import { getTickerResults, GOOD } from '../../../../store/local/localActions'
import {
  formatNumber,
  getDifferenceBetween,
  getPercentDifference,
  isSameObject,
  roundNumberDec,
  trimDate
} from '../../../../utils'
import AssetsVsLiabilities from '../charts/AssetsVsLiabilities'
import SimplePie from '../charts/SimplePie'
import MetricSelector from '../MetricSelector'
import { getMetricItem } from './UtilMetrics'

export default function SafetyMetric() {
  const [results, setResults] = useState({})

  useEffect(() => {
    async function getData() {
      //* Load the ticker results
      setResults(await getTickerResults())
    }
    getData()
  }, [])

  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container">
            <div className="metric-metrics">{getPriceOverview(results)}</div>
            <div className="metric-charts">
              <div className="metric-chart shadow-nohover">
                <AssetsVsLiabilities />
              </div>
              <div className="safety-lowerhalf">
                <div className="metric-chart clean">
                  <SimplePie data={results.ltldata} />
                </div>
                <div className="fcftoltl">
                  <div>
                    <label>Total Current Liabilities:</label>
                    <span>{`$${results.ltldata ? formatNumber(results.ltldata.libs) : '0'}`}</span>
                  </div>
                  <div>
                    <label>5yr Avg. Free Cash Flow:</label>
                    <span>{`$${results.ltldata ? formatNumber(results.ltldata.avg) : '0'}`}</span>
                  </div>
                  <div>
                    <label>Years to pay off debt:</label>
                    <span>{results.ltldata ? roundNumberDec(results.ltldata.years) : '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to return all of the metrics
//* For an overview, this is what shows all
//* Of the metrics we use to the user.
function getPriceOverview(results) {
  if (!results || isSameObject({}, results)) return <></>

  const { k, a, b } = results.assetsdata
  const difference = getDifferenceBetween(a)
  const percdiffc = getPercentDifference(a[a.length - 1], b[b.length - 1])

  const result = results.assets

  const assetsresults = `${results.symbol} has ${roundNumberDec(percdiffc)}% greater ${
    result === GOOD ? 'Assets' : 'Liabilities'
  } than ${result === GOOD ? 'Liabilities' : 'Assets'}! That's a five year ${
    difference > 0 ? 'increase' : 'decrease'
  } of $${formatNumber(difference)} in assets!`

  return (
    <div className="pricemetrics">
      <div className="metric-spacer"></div>
      <div className="metric">
        {getMetricItem('Assets > Liabilities', result)}
        <span className="result">{assetsresults}</span>
        <div className="desc">
          <p>
            Financially healthy companies generally have a manageable amount of debt (liabilities).
            If the debt level has been falling over time, that’s a good sign. A business with more
            assets than liabilities is also a good sign. However, if liabilities are more than
            assets, you need to look more closely at the company’s ability to pay its debt
            obligations.
          </p>
        </div>
        <div className="previewcontainer">{getDataPreview(k, a, b)}</div>
      </div>
      <div className="metric">
        {getMetricItem('LT Liabilties / 5yr FCF; < 5', results.ltl)}
        <span className="result">{`It would take ${results.symbol} aprox ${roundNumberDec(
          results.ltldata.years
        )} years to pay of their debt!`}</span>
        <div className="desc">
          <p>
            The Free Cash Flow to Long Term Debt ratio measures the sustainability of the debt
            structure based on available free cash flow and is an indicator of the company’s
            financial leverage. The higher this ratio, the longer it would take the company to pay
            off their debt and therefore it is less sustainable!
          </p>
        </div>
      </div>
      <div className="metric-spacer"></div>
    </div>
  )
}

//* Function to return the data preview
//* Should take you to the proper financials
//* whenever the user clicks on it!
function getDataPreview(k, a, b) {
  return (
    <div className="safety-preview shadow-nohover zoomable-med">
      <div className="prev-wrapper">
        <table>
          <tbody>
            <tr>{getTableDatas(k, trimDate, 'head')}</tr>
            <tr>{getTableDatas(a, formatNumber, 'assets')}</tr>
            <tr>{getTableDatas(b, formatNumber, 'liabilities')}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

//* Function to get the table data
function getTableDatas(arr, formatFunc, className) {
  return arr.map((x, i) => (
    <td className={className} key={i}>
      {formatFunc(x)}
    </td>
  ))
}
