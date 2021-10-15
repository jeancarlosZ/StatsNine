import React from 'react'
import { formatNumber, roundNumberDec } from '../../../utils'

export default function CompanyInfo(props) {
  const {
    symbol = '....',
    companyName = 'Loading...',
    image,
    exchangeShortName = 'NASDAQ',
    industry = 'Loading...',
    sector = 'Loading...',
    fullTimeEmployees = 99999,
    price = 999.99
  } = props.profile

  return (
    <div className="company-container">
      <div className="company-info">
        <span className="company-name">{companyName}</span>
        <div className="ticker-container">
          <span className="bold ticker">{symbol}</span>
          <span className="bold exchange">{exchangeShortName}</span>
        </div>
        <div className="fin-price-container">
          <span className="bold price">{`$${roundNumberDec(price)}`}</span>
        </div>
        <div className="fin-otherinfo-container">
          {getLabelText('Industry:', industry, 'industry fin-labeltext')}
          {getLabelText('Sector:', sector, 'sector fin-labeltext')}
          {getLabelText(
            'Employees:',
            formatNumber(fullTimeEmployees, true),
            'employees fin-labeltext'
          )}
        </div>
      </div>
    </div>
  )
}

//* Get label text
function getLabelText(label, text, classname) {
  return (
    <div className={classname}>
      <span className="fin-head">{label}</span>
      <span>{text}</span>
    </div>
  )
}
