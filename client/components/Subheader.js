import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getLocalData } from '../store/local/localActions'

export default function Subheader() {
  const history = useHistory()
  const location = useLocation()
  const selected = location.pathname.toLowerCase()

  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      // const a = getLocalData()
      setData({})
    }
    getData()
  }, [])

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
        <div className="stock-preview-container"></div>
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
