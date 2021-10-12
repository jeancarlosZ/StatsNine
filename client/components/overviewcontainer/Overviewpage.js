import React from 'react'
import { useSelector } from 'react-redux'
import Subheader from '../Subheader'
import Overview from '../overviewcontainer/overview/Overview'

export default function Overviewpage() {
  const { symbol } = useSelector(state => state.local)

  return (
    <div>
      <Subheader symbol={symbol} />
      <Overview symbol={symbol} />
    </div>
  )
}
