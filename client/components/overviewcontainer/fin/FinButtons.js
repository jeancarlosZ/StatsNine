import React, { useState, useEffect } from "react";

export function FinButtons({ handleButtonClick, label, buttons = true, colors = true }) {
  const [selected, setSelected] = useState("annual");

  return (
    <div className="fin-button-container">
      <label>{label}</label>
      {getButtons(selected, setSelected, handleButtonClick, buttons, colors)}
    </div>
  );
}

function getButtons(selected, setSelected, handleButtonClick, buttons, colors) {
  if (!buttons && !colors) return <></>;
  if (!buttons)
    return (
      <>
        <div className="legend-wrapper">
          <div>Annual</div>
          <div className="color-one"></div>
          <div>Quarter</div>
          <div className="color-two"></div>
        </div>
      </>
    );
  return (
    <div className="button-pos">
      <button
        className={selected === "annual" ? `fin-selected` : ""}
        onClick={() => {
          handleButtonClick("annual");
          setSelected("annual");
        }}
      >
        Annual
      </button>
      <button
        className={selected === "quarter" ? `fin-selected` : ""}
        onClick={() => {
          handleButtonClick("quarter");
          setSelected("quarter");
        }}
      >
        Quarterly
      </button>
    </div>
  );
}
