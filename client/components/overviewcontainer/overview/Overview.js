import React from 'react';
import PriceChart from '../PriceChart';
import Description from '../Description';
import OverallDetermination from '../OverallDetermination';

export default function Overview() {
  return (
    <div className="overview flex-col background">
      <PriceChart />
      <div className="overview-details flex-row">
        <OverallDetermination />
        <Description />
      </div>
    </div>
  );
}
