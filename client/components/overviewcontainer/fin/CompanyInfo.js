import React from 'react';

export default function CompanyInfo(props) {
  let name;
  let ticker;

  if (props.profile) {
    name = props.profile.companyName;
    ticker = props.profile.symbol;
  } else {
    name = 'Loading...';
    ticker = 'Loading...';
  }

  return (
    <div className="company-container pos-rel flex-col">
      <div className="company-info pos-rel">
        <span className="company-name">{name}</span>
        <div className="ticker-container flex-col justify-between">
          <span className="bold">{ticker}</span>
          {/* <span className="ticker bold">{props.symbol}</span> */}
        </div>
      </div>
    </div>
  );
}
