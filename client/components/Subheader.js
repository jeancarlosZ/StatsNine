import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { fetchStockProfile } from '../api/api'
import { getLocalData } from '../store/local/localActions'

export default function Subheader(props) {
  const symbol = props.symbol
  const history = useHistory()
  const location = useLocation()
  const selected = location.pathname.toLowerCase()
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      //* Fetch data from API
      const { symbol, companyName, image } = await getLocalData(
        ['symbol', 'companyName', 'image'],
        fetchStockProfile,
        [],
        ['symbol', 'companyName', 'image'],
      )
      setData({ symbol, companyName, image })
    }
    getData()
  }, [symbol])

  return (
    <div>
      <nav className='sub-header'>
        <div className='sub-header-pages-container'>
          <div className='sub-header-pages'>
            <div
              className={`sub-page${getSelected(selected, 'overviewpage')}`}
              onClick={() => history.push('/overviewpage')}
            >
              Overview
            </div>
            <div
              className={`sub-page${getSelected(selected, 'keymetrics')}`}
              onClick={() => history.push('/overviewpage/keymetrics')}
            >
              Key Metrics
            </div>
            <div
              className={`sub-page${getSelected(selected, 'financials')}`}
              onClick={() => history.push('/overviewpage/financials')}
            >
              Financials
            </div>
          </div>
        </div>
        <div className='preview-spacer'></div>
        <div className='stock-preview-container'>
          <img className='company-logo' src={data.image ? data.image : ''} alt='temp' />
          <div>
            <label>{data.companyName}</label>
            <span>{data.symbol}</span>
          </div>
        </div>
      </nav>
    </div>
  )
}

//* Check if current route is selected
function getSelected(selected, route) {
  let isRoute = false
  //* If URL includes(route)
  if (selected.includes(route)) isRoute = true //* If route is overviewpage overview page must be the last /..
  if (route === 'overviewpage' && selected.split('/').pop() != route) isRoute = false
  return isRoute ? ' selectedpage' : ''
}
