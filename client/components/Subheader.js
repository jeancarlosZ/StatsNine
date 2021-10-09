import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Subheader() {
  const history = useHistory();

  return (
    <div>
      <nav className="sub-header">
        <button
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage')}
        >
          Overview
        </button>
        <button
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage/keyMetrics')}
        >
          Key Metrics
        </button>
        <button
          className="buttons sub-button pos-rel bold"
          onClick={() => history.push('/overviewpage/financials')}
        >
          Financials
        </button>
      </nav>
    </div>
  );
}
