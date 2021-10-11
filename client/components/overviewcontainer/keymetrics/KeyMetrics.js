import React from 'react';
import { useLocation } from 'react-router-dom';
import Subheader from '../../Subheader';
import MetricSelector from './MetricSelector';
import GrowthMetric from './subpages/GrowthMetric';
import Metrics from './subpages/Metrics';
import PriceMetric from './subpages/PriceMetric';
import QualityMetric from './subpages/QualityMetric';
import SafetyMetric from './subpages/SafetyMetric';
import TestPage from '../../../api/TestPage';

export default function KeyMetrics() {
  const location = useLocation();
  const selected = location.pathname.split('/').pop().toLowerCase();

  return (
    <>
      <Subheader />
      {getCorrectPage(selected)}
      {/* <div className="key-metrics-container"> */}
      {/* <div className="sub-container shadow-deep-nohover"> */}
      {/* <MetricSelector /> */}
      {/* <div className="metric-container">{getCorrectPage(selected)}</div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

//* Function used to return/render the correct page
function getCorrectPage(selected) {
  switch (selected) {
    case 'price':
      return <PriceMetric />;
    case 'growth':
      return <GrowthMetric />;
    case 'quality':
      return <QualityMetric />;
    case 'safety':
      return <SafetyMetric />;
    // TODO: !Remove this
    case 'test':
      return <TestPage />;
    default:
      return <Metrics />;
  }
}
