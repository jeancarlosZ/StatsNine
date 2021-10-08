import React from 'react';
import PriceChart from '../PriceChart';
import Description from '../Description';
import OverallDetermination from '../OverallDetermination';

export default function Overview() {
  return (
    <div className="overview flex-col font-color justify-evenly">
      <PriceChart />
      <div className="overview-details flex-row align-self justify-around">
        <OverallDetermination />
        <Description />
      </div>
    </div>
  );
}
