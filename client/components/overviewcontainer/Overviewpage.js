import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Subheader from '../Subheader'
import Overview from '../overviewcontainer/overview/Overview'
import PriceChart from './PriceChart'
import OverallDetermination from './OverallDetermination'
import Description from './Description'
import { getLocalData } from '../../store/local/localActions'
import { fetchStockProfile } from '../../api/api'

export default function Overviewpage() {
  const { symbol } = useSelector(state => state.local)

  const [data, setData] = useState({ companyName: 'Loading...', description: 'Loading...' })

  //* I added the description just to make sure it works, hopefully you don't mind
  //* TODO: For you Jean, you need to implement the determination message.
  //* TODO: You can go about this a few ways, i'll let you figure it out!
  useEffect(() => {
    async function getData() {
      //* Fetch data from API
      const { description, companyName } = await getLocalData(
        ['description', 'companyName'],
        fetchStockProfile,
        [],
        ['description', 'companyName']
      )
      setData({ description, companyName })
    }
    getData()
  }, [symbol])

  return (
    <>
      <Subheader symbol={symbol} />
      <div className="overview-page">
        {/* <Overview symbol={symbol} /> */}
        <div className="overview-container">
          <PriceChart symbol={symbol} />
          <div className="overview-info">
            <OverallDetermination symbol={symbol} />
            <Description symbol={symbol} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
