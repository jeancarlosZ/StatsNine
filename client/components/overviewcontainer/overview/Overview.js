import React from 'react'
import Description from '../Description'
import OverallDetermination from '../OverallDetermination'
import PriceChart from '../PriceChart'

export default function Overview(props) {
  const symbol = props.symbol

  return (
    <div className='overview flex-col font-color justify-evenly'>
      <PriceChart symbol={symbol} />
      <div className='overview-details flex-row align-self justify-around'>
        <OverallDetermination symbol={symbol} />
        <Description symbol={symbol} />
      </div>
    </div>
  )
}
