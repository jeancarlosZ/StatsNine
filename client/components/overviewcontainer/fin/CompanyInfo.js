import React from 'react';

export default function CompanyInfo(props) {
  return (
    <div className="company-container align-self flex-col">
      <div className="company-info pos-rel">
        <span className="company-name bold">{props.companyName}</span>
        <div className="ticker-container flex-row justify-between">
          <span className="ticker bold">{props.symbol}</span>
          <span className="bold">{props.ticker}</span>
        </div>
      </div>
    </div>
  );
}
