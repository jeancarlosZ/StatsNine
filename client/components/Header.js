import React from 'react'
import Searchbar from './Searchbar'
import { useHistory, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Header() {
  const history = useHistory()
  //* Hope you don't mind! <3
  //* I added these so the (current) link can be slighly
  //* highlighed on the navbar (dashboard, screener, aboutus)
  const location = useLocation()
  const selected = location.pathname.split('/').pop().toLowerCase()

  return (
    <div className="our-company-header shadow-deep-nohover">
      <div className="our-company-name">StatsNine</div>
      <div className="header-space-one"></div>
      <Searchbar />
      <div className="header-space-two"></div>
      <div
        className={`go-to-dashboard${getSelected(selected, 'home')}`}
        onClick={() => history.push('/home')}
      >
        Dashboard
      </div>
      <div
        className={`go-to-screener${getSelected(selected, 'screener')}`}
        onClick={() => history.push('/screener')}
      >
        Screener
      </div>
      <div
        className={`go-to-about-us${getSelected(selected, 'aboutus')}`}
        onClick={() => history.push('/aboutus')}
      >
        About Us
      </div>
    </div>
  )
}

//* Check if current route is selected
function getSelected(selected, route) {
  if (route === 'home' && !selected) return ' currentlink'
  return selected === route ? ' currentlink' : ''
}
