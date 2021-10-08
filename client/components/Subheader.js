import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Overview from './overviewcontainer/overview/Overview'
import Financialspage from './overviewcontainer/fin/Financialspage'
import KeyMetrics from './overviewcontainer/keymetrics/KeyMetrics'

export default function Subheader() {
  const [overview, setOverview] = useState(true)
  const [financials, setFinancials] = useState(false)
  const [keyMetrics, setKeyMetrics] = useState(false)

  function handleClick(event) {
    const page = event.target.value
    if (page === 'overview') {
      setPageBoolean(setOverview, setFinancials, setKeyMetrics)
    } else if (page === 'financials') {
      setPageBoolean(setFinancials, setKeyMetrics, setOverview)
    } else {
      setPageBoolean(setKeyMetrics, setOverview, setFinancials)
    }
  }

  function setPageBoolean(pageOne, pageTwo, pageThree) {
    pageOne(true)
    pageTwo(false)
    pageThree(false)
  }
  return (
    <div>
      <nav className="sub-header">
        <button value="overview" className="buttons sub-button pos-rel bold" onClick={handleClick}>
          Overview
        </button>
        <button
          value="keyMetrics"
          className="buttons sub-button pos-rel bold"
          onClick={handleClick}
        >
          Key Metrics
        </button>
        <button
          value="financials"
          className="buttons sub-button pos-rel bold"
          onClick={handleClick}
        >
          Financials
        </button>
      </nav>
      {/* {overview ? (
        <Overview />
      ) : keyMetrics ? (
        <KeyMetrics />
      ) : (
        <Financialspage />
      )} */}
    </div>
  )
}
