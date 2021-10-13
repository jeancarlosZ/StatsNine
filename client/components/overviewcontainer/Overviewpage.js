import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchStockProfile } from '../../api/api'
import { getLocalData } from '../../store/local/localActions'
import Subheader from '../Subheader'
import Description from './Description'
import OverallDetermination from './OverallDetermination'
import PriceChart from './PriceChart'

export default function Overviewpage() {
  const { symbol } = useSelector(state => state.local)

  const [data, setData] = useState({ companyName: 'Loading...', description: 'Loading...' })

  useEffect(() => {
    async function getData() {
      //* Fetch data from API
      const { description, companyName } = await getLocalData(
        ['description', 'companyName'],
        fetchStockProfile,
        [],
        ['description', 'companyName'],
      )
      setData({ description, companyName })
    }
    getData()
  }, [symbol])

  return (
    <>
      <Subheader symbol={symbol} />
      <div className='overview-page'>
        {/* <Overview symbol={symbol} /> */}
        <div className='overview-container'>
          <PriceChart symbol={symbol} />
          <div className='overview-info'>
            <OverallDetermination symbol={symbol} />
            <Description symbol={symbol} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
