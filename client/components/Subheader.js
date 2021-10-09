import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Overview from './overviewcontainer/overview/Overview';
import Financialspage from './overviewcontainer/fin/Financialspage';
import KeyMetrics from './overviewcontainer/keymetrics/KeyMetrics';

export default function Subheader() {
  const history = useHistory();

  return (
    <div>
      <nav className="sub-header">
        <button
          value="overview"
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage/overview')}
        >
          Overview
        </button>
        <button
          value="keyMetrics"
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage/keyMetrics')}
        >
          Key Metrics
        </button>
        <button
          value="financials"
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage/financials')}
        >
          Financials
        </button>
      </nav>
    </div>
  );
}
