import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { fetchStockProfile } from '../api/api'
import { getLocalData } from '../store/local/localActions'

export default function Subheader() {
  const history = useHistory()
  const location = useLocation()
  const selected = location.pathname.toLowerCase()

  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      const { symbol, companyName, image } = await getLocalData(
        ['symbol', 'companyName', 'image'],
        fetchStockProfile,
        [],
        ['symbol', 'companyName', 'image']
      )
      setData({ symbol, companyName, image })
    }
    getData()
  }, [])

  //! Remove
  console.log('--------------------')
  console.log('data:', data)
  console.log('--------------------')
  //! Remove

  return (
    <div>
      <nav className="sub-header">
        <div className="sub-header-pages-container">
          <div className="sub-header-pages">
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
        <div className="preview-spacer"></div>
        <div className="stock-preview-container">
          <img
            className="company-logo"
            // style={{ height: 48, width: 48, borderRadius: 90 }}
            src={data.image ? data.image : ''}
            alt="temp"
          />
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
  if (selected.includes(route)) isRoute = true
  if (route === 'overviewpage' && selected.split('/').pop() != route) isRoute = false
  return isRoute ? ' selectedpage' : ''
}
