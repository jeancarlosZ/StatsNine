import React from 'react';
import PriceChart from '../PriceChart';
import Description from '../Description';
import OverallDetermination from '../OverallDetermination';

export default function Overview() {
  return (
    <div className="overview font-color">
      <PriceChart />
      <div className="overview-details">
        <OverallDetermination />
        <Description />
      </div>
    </div>
  );
}
