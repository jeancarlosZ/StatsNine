import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Collapse, DropdownButton } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DatePicker, { utils } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import UniversalChart from '../components/UniversalChart'
import { getLocalData } from '../store/local/localActions'
import {
  ALL,
  DAILY,
  fetchChartPrice,
  fetchStockNews,
  FIVE_YEAR,
  MONTH,
  SIX_MONTH,
  TEN_YEAR,
  THREE_MONTH,
  WEEK,
  YEAR
} from './api'
// import DatePicker from 'react-modern-calendar-datepicker'
// import { utils } from 'react-modern-calendar-datepicker'

export default function APITestPage() {
  // const today = new Date()
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null
  // })
  // const formatInputValue = () => {
  //   if (!selectedDayRange) return ''
  //   return `Day: ${selectedDayRange}`
  // }
  // // https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/customization
  // return (
  //   <DatePicker
  //     value={selectedDayRange}
  //     onChange={setSelectedDayRange}
  //     inputPlaceholder="Select a day range"
  //     maximumDate={utils().getToday()}
  //     shouldHighlightWeekends
  //     // colorPrimary=""
  //     // colorPrimaryLight=""
  //     renderInput={({ ref }) => {
  //       console.log(ref)
  //     }}
  //     inputPlaceholder="Select a date"
  //     // formatInputText={formatInputValue}
  //   />
  // )
  return (
    <div className="dashboard">
      <div className="dash-container">
        <StockNews />
        <div className="dash-grid two">
          <DashboardPriceChart />
        </div>
        <div className="dash-grid four">
          <div className="dash-text">
            <label className="statsnine">Welcome to StatsNine.</label>
            <label className="welcome">
              Designed to help you make more informed financial decisions.
            </label>
            <SimpleBar className="scrolltext">
              <div className="innertexts">
                If the thought of investing in the stock market scares you, you are not alone.
                Individuals with very limited experience in stock investing are either terrified by
                horror stories of the average investor losing 50% of their portfolio value—for
                example, in the two bear markets that have already occurred in this millennium —or
                are beguiled by "hot tips" that bear the promise of huge rewards but seldom pay off.
                It is not surprising, then, that the pendulum of investment sentiment is said to
                swing between fear and greed.
              </div>
              <div className="innertexts">
                The reality is that investing in the stock market carries risk, but when approached
                in a disciplined manner, it is one of the most efficient ways to build up one's net
                worth. While the value of one's home typically accounts for most of the net worth of
                the average individual, most of the affluent and very rich generally have the
                majority of their wealth invested in stocks. In order to understand the mechanics of
                the stock market, let's begin by delving into the definition of a stock and its
                different types.
              </div>
              <div className="innertexts">
                <ul>
                  <li>
                    Stocks, or shares of a company, represent ownership equity in the firm, which
                    give shareholders voting rights as well as a residual claim on corporate
                    earnings in the form of capital gains and dividends.
                  </li>
                  <li>
                    Stock markets are where individual and institutional investors come together to
                    buy and sell shares in a public venue. Nowadays these exchanges exist as
                    electronic marketplaces.
                  </li>
                  <li>
                    Share prices are set by supply and demand in the market as buyers and sellers
                    place orders. Order flow and bid-ask spreads are often maintained by specialists
                    or market makers to ensure an orderly and fair market.
                  </li>
                </ul>
                <div className="innertexts">
                  The prices of shares on a stock market can be set in a number of ways, but most
                  the most common way is through an auction process where buyers and sellers place
                  bids and offers to buy or sell. A bid is the price at which somebody wishes to
                  buy, and an offer (or ask) is the price at which somebody wishes to sell. When the
                  bid and ask coincide, a trade is made.
                </div>
                <div className="innertexts">
                  The stock market also offers a fascinating example of the laws of supply and
                  demand at work in real time. For every stock transaction, there must be a buyer
                  and a seller. Because of the immutable laws of supply and demand, if there are
                  more buyers for a specific stock than there are sellers of it, the stock price
                  will trend up. Conversely, if there are more sellers of the stock than buyers, the
                  price will trend down.
                </div>
                <div className="innertexts">
                  The bid-ask or bid-offer spread—the difference between the bid price for a stock
                  and its ask or offer price—represents the difference between the highest price
                  that a buyer is willing to pay or bid for a stock and the lowest price at which a
                  seller is offering the stock. A trade transaction occurs either when a buyer
                  accepts the ask price or a seller takes the bid price. If buyers outnumber
                  sellers, they may be willing to raise their bids in order to acquire the stock;
                  sellers will, therefore, ask higher prices for it, ratcheting the price up. If
                  sellers outnumber buyers, they may be willing to accept lower offers for the
                  stock, while buyers will also lower their bids, effectively forcing the price
                  down.
                </div>
                <div className="innertexts">
                  Some stock markets rely on professional traders to maintain continuous bids and
                  offers since a motivated buyer or seller may not find each other at any given
                  moment. These are known as specialists or market makers. A two-sided market
                  consists of the bid and the offer, and the spread is the difference in price
                  between the bid and the offer. The more narrow the price spread and the larger
                  size of the bids and offers (the amount of shares on each side), the greater the
                  liquidity of the stock. Moreover, if there are many buyers and sellers at
                  sequentially higher and lower prices, the market is said to have good depth. Stock
                  markets of high quality generally tend to have small bid-ask spreads, high
                  liquidity, and good depth. Likewise, individual stocks of high quality, large
                  companies tend to have the same characteristics.
                </div>
                <div className="innertexts">
                  Matching buyers and sellers of stocks on an exchange was initially done manually,
                  but it is now increasingly carried out through computerized trading systems. The
                  manual method of trading was based on a system known as "open outcry," in which
                  traders used verbal and hand signal communications to buy and sell large blocks of
                  stocks in the "trading pit" or the floor of an exchange.
                </div>
                <div className="innertexts">
                  However, the open outcry system has been superseded by electronic trading systems
                  at most exchanges. These systems can match buyers and sellers far more efficiently
                  and rapidly than humans can, resulting in significant benefits such as lower
                  trading costs and faster trade execution.
                </div>
                <div className="innertexts">
                  If you read this far... really... well, long story short. Stonks go up but also
                  sometime. Stonk go down.
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  )
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
      <div className="news-container shadow-deep-nohover">
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
    <div className="news-item slide-loading">
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

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
function DashboardPriceChart() {
  //* Selected Range, series, and the chart data
  const [range, setRange] = useState(FIVE_YEAR)
  const [series, setSeries] = useState(DAILY)
  const [data, setData] = useState({})
  //* Do we need to update the data
  const [update, setUpdate] = useState(true)

  //* When the component is mounted we just need
  //* to load the data, and update the state.
  useEffect(() => {
    //* Here we will create a 'async' getData function. Here
    //* you will call all of the functions required apon load.
    async function getData() {
      if (update) {
        setData({
          ...data, //* Upate data  { ...data, [range]: newData }
          [range]: await getLocalData(
            'close', //* key
            fetchChartPrice, //* func
            [series, range], //* args
            `price${series}${range}`, //* saveas
            'SPY'
          )
        })
        setUpdate(false)
      }
    }
    //* Now you call the getData function
    getData()
  }, [series, range])

  //* Get the keys and values from the data
  const { keys, values } = !data[range] ? {} : data[range]

  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Stock Price',
      type: 'line',
      color: 'rgba(48, 145, 236, 1)',
      outline: 'rgba(48, 145, 236, 1)',
      fillcolor: 'rgba(48, 145, 236, .2)',
      fill: 'tonexty',
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      // values: values.map(x => x.close)
      values: values
    })
  }

  //* Change the series and update the data
  function updateSeries(series, newSeries) {
    if (series !== newSeries) {
      setSeries(newSeries)
      setUpdate(true)
    }
  }

  //* Change the range and update the data
  function updateRange(range, newRange) {
    if (range !== newRange) {
      setRange(newRange)
      if (!data[newRange]) setUpdate(true)
    }
  }

  //* Return the chart
  return (
    <>
      <div className="wrapper shadow-deep-nohover">
        <div className="selector">
          <label>Stock Price</label>
          {getSelectors(series, range, updateSeries, updateRange)}
        </div>
        <UniversalChart
          className="stock-price-chart"
          keys={keys}
          dataset={dataset}
          showlegend={false}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          margin={{ l: 50, r: 50, b: 25, t: 35 }}
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </>
  )
}

//* Get the options/selector buttons
function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div>
      <DropdownButton className="dropdown-selector" title={range} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => updateRange(range, ALL)}>All</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, TEN_YEAR)}>10 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, FIVE_YEAR)}>5 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, YEAR)}>1 Year</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, SIX_MONTH)}>6 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, THREE_MONTH)}>3 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, MONTH)}>1 month</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, WEEK)}>1 Week</Dropdown.Item>
      </DropdownButton>

      {/* Potential future add-on */}
      {/* <DropdownButton id="dropdown-basic-button" title={series}>
        <Dropdown.Item onClick={() => updateSeries(series, DAILY)}>Daily</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateSeries(series, FOUR_HOUR)}>4 Hour</Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, HOUR)}>1 Hour</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateSeries(series, THIRTY_MINUTE)}>30 Minute</Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, FIFTEEN_MINUTE)}>
          15 Minute
        </Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, MINUTE)}>1 Minute</Dropdown.Item>
      </DropdownButton> */}
    </div>
  )
}
