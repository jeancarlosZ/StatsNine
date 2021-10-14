import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { fetchStockNews, fetchStockProfile } from './api'
// import DatePicker from 'react-modern-calendar-datepicker'
// import { utils } from 'react-modern-calendar-datepicker'

export default function APITestPage() {
  async function testThings() {
    const body = {
      symbol: 'AAPL',
      search: [''],
      save: [''],
      arguments: [''],
      func: fetchStockProfile
    }

    const { data } = await axios.get('/api/data', body)

    console.log(data)
  }

  testThings()

  return <></>

  // return (
  //   <div className="dashboard">
  //     <div className="dash-container">
  //       <StockNews />
  //       <div className="dash-grid two"></div>
  //       <div className="dash-grid three"></div>
  //       <div className="dash-grid four"></div>
  //     </div>
  //   </div>
  // )
}

//* Stock news component for the home page
function StockNews() {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      setData(await fetchStockNews())
    }
    getData()
  }, [])

  return (
    <div className="dash-grid one">
      <div className="news-container">
        <div className="news-head shadow-nohover">
          <label>News Feed</label>
        </div>
        <SimpleBar className="news-scroll">{getNewsFeed(data)}</SimpleBar>
      </div>
    </div>
  )
}

//* Helper function to map the news feed
function getNewsFeed(data) {
  if (!data) return <></>
  return data.map((x, i) => <IndividualNews key={i} data={x} />)
}

function IndividualNews({ data }) {
  if (!data) return <></>
  const [open, setOpen] = useState(false)
  const { image, publishedDate, site, symbol, text, title, url } = data

  return (
    <div className="news-item">
      <img src={image} alt={symbol} />
      <div className="news-content" onClick={() => setOpen(!open)}>
        <label>{title}</label>
        {open ? <></> : <label className="view">Click to expand!</label>}
        <Collapse in={open}>
          <div className="news-content-full">
            {getLabelText('Publisher:', site)}
            {getLabelText('Published:', publishedDate)}
            <div className="fulltext">{text}</div>
            <Link to={{ pathname: url }} target="_blank">
              <div className="redirect">
                <button>View Article</button>
              </div>
            </Link>
          </div>
        </Collapse>
      </div>
    </div>
  )
}

//* Get the label text pairs
function getLabelText(label, text) {
  return (
    <div className="labeltext">
      <label>{label}</label>
      <span>{text}</span>
    </div>
  )
}

// const today = new Date()
// const [selectedDayRange, setSelectedDayRange] = useState({
//   from: null,
//   to: null
// })
//
// const formatInputValue = () => {
//   if (!selectedDayRange) return ''
//   return `Day: ${selectedDayRange}`
// }
// https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/customization
//    <DatePicker
//    value={selectedDayRange}
//    onChange={setSelectedDayRange}
//    inputPlaceholder="Select a day range"
//    maximumDate={utils().getToday()}
//    shouldHighlightWeekends
//    // colorPrimary=""
//    // colorPrimaryLight=""
//    renderInput={({ ref }) => {
//      console.log(ref)
//    }}
//    inputPlaceholder="Select a date"
//    // formatInputText={formatInputValue}
//    />
