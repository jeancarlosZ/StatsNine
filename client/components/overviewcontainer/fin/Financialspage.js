import React from 'react';
import Income from './Income';

export default function Financialspage() {
  return (
    <div className="main flex-col justify-center">
      <div className="card align-self justify-around">
        <FinancialsNavBar />
        <Income />
      </div>
    </div>
  );
}

function FinancialsNavBar() {
  return (
    <nav className="fin-nav">
      <button className="buttons nav-button">Income Statement</button>
      <button className="buttons nav-button inactive">Balance Sheet</button>
      <button className="buttons nav-button inactive">Cash Flow</button>
      <button className="buttons nav-button inactive">Dividends</button>
    </nav>
  );
}
