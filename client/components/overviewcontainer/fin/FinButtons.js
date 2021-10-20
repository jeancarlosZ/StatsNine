import React, { useState, useEffect } from 'react';

export function FinButtons({ handleButtonClick, label, buttons = true }) {
  const [selected, setSelected] = useState('annual');

  return (
    <div className="fin-button-container">
      <label>{label}</label>
      {getButtons(selected, setSelected, handleButtonClick, buttons)}
    </div>
  );
}

function getButtons(selected, setSelected, handleButtonClick, buttons) {
  if (!buttons) return <></>;
  return (
    <div>
      <button
        className={selected === 'annual' ? `fin-selected` : ''}
        onClick={() => {
          handleButtonClick('annual');
          setSelected('annual');
        }}
      >
        Annual
      </button>
      <button
        className={selected === 'quarter' ? `fin-selected` : ''}
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
