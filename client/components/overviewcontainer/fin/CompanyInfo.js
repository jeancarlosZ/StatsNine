import React from 'react';

export default function CompanyInfo(props) {
  return (
    <div className="company-container pos-rel flex-col">
      <div className="company-info pos-rel">
        <span className="company-name">{props.companyName}</span>
        <div className="ticker-container flex-col justify-between">
          <span className="bold">{props.ticker}</span>
          <span className="ticker bold">{props.symbol}</span>
        </div>
      </div>
    </div>
  );
}
