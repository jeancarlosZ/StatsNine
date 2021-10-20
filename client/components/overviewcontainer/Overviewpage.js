import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLocalData } from '../../store/local/localActions'
import Loading from '../Loading'
import Subheader from '../Subheader'
import Description from './Description'
import OverallDetermination from './OverallDetermination'
import PriceChart from './PriceChart'

export default function Overviewpage() {
  const { symbol } = useSelector(state => state.local)

  const [data, setData] = useState({ companyName: 'Loading...', description: 'Loading...' })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function getData() {
      //* Fetch data from API
      const { description, companyName } = await getLocalData(
        ['description', 'companyName'],
        'fetchStockProfile',
        [],
        ['description', 'companyName']
      )
      setData({ description, companyName })
      setLoaded(true)
    }
    getData()
  }, [symbol])

  if (!loaded) return <Loading />

  return (
    <>
      <Subheader symbol={symbol} />
      <div className="overview-page">
        <div className="overview-container">
          <PriceChart symbol={symbol} loaded={loaded} setLoaded={setLoaded} />
          <div className="overview-info">
            <OverallDetermination symbol={symbol} loaded={loaded} setLoaded={setLoaded} />
            <Description symbol={symbol} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
