import React from 'react';
import Subheader from '../../Subheader';
import Income from './Income';
import { useHistory } from 'react-router-dom';

export default function Financialspage() {
  return (
    <>
      <Subheader />
      <div className="main flex-col justify-center">
        <div className="card align-self justify-around">
          <FinancialsNavBar />
          <Income />
        </div>
      </div>
    </>
  );
}

export function FinancialsNavBar() {
  const history = useHistory();
  return (
    <nav className="fin-nav">
      <button
        className="buttons nav-button"
        onClick={() => history.push('/overviewpage/financials')}
      >
        Income Statement
      </button>
      <button
        className="buttons nav-button"
        onClick={() => history.push('/overviewpage/financials/balance')}
      >
        Balance Sheet
      </button>
      <button
        className="buttons nav-button"
        onClick={() => history.push('/overviewpage/financials/cashflow')}
      >
        Cash Flow
      </button>
      <button
        className="buttons nav-button"
        onClick={() => history.push('/overviewpage/financials/dividends')}
      >
        Dividends
      </button>
    </nav>
  );
}
