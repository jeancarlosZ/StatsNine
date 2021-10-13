import React from 'react'
import { useSelector } from 'react-redux'
import Subheader from '../Subheader'
import Overview from '../overviewcontainer/overview/Overview'
import PriceChart from './PriceChart'
import OverallDetermination from './OverallDetermination'
import Description from './Description'

export default function Overviewpage() {
  const { symbol } = useSelector(state => state.local)

  return (
    <>
      <Subheader symbol={symbol} />
      <div className="overview-page">
        {/* <Overview symbol={symbol} /> */}
        <div className="overview-container">
          <PriceChart symbol={symbol} />
          <div className="overview-info">
            <OverallDetermination symbol={symbol} />
            <Description symbol={symbol} />
          </div>
        </div>
      </div>
    </>
  )
}
