import React, { useState, useEffect } from 'react';

export function FinButtons(props) {
  const [selected, setSelected] = useState('annual');
  const handleButtonClick = props.handleButtonClick;

  return (
    <div className="fin-button-container pos-rel">
      <button
        className={
          selected === 'annual' ? `fin-selected fin-buttons` : 'fin-buttons'
        }
        onClick={() => {
          handleButtonClick('annual');
          setSelected('annual');
        }}
      >
        Annual
      </button>
      <button
        className={
          selected === 'quarter' ? `fin-selected fin-buttons` : 'fin-buttons'
        }
        onClick={() => {
          handleButtonClick('quarter');
          setSelected('quarter');
        }}
      >
        Quarterly
      </button>
    </div>
  );
}
