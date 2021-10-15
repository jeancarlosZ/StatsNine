import React from 'react';

export default function CompanyInfo(props) {
  let name;
  let ticker;
  let image;

  if (props.profile) {
    name = props.profile.companyName;
    ticker = props.profile.symbol;
    image = props.profile.image;
  } else {
    name = 'Loading...';
    ticker = 'Loading...';
  }

  return (
    <div className="company-container pos-rel flex-col">
      <div className="company-info pos-rel">
        <span className="company-name">{name}</span>
        <div className="ticker-container flex-col justify-between">
          <span className="bold ticker">{ticker}</span>
        </div>
      </div>
    </div>
  );
}
