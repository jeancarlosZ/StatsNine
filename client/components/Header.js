import React from "react";
import Searchbar from "./Searchbar";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const selected = location.pathname.split("/").pop().toLowerCase();
  const { isDefault } = useSelector((state) => state.local);

  return (
    <div className="our-company-header shadow-deep-nohover">
      <div className="our-company-name" onClick={() => history.push("/home")}>
        StatsNine
      </div>
      <div className="header-space-one"></div>
      <Searchbar />
      <div className="header-space-two"></div>
      {getOverview(isDefault, selected, history)}
      <div
        className={`go-to-dashboard${getSelected(selected, "home")}`}
        onClick={() => history.push("/home")}
      >
        Dashboard
      </div>
      <div
        className={`go-to-screener${getSelected(selected, "screener")}`}
        onClick={() => history.push("/screener")}
      >
        Screener
      </div>
      <div
        className={`go-to-terms${getSelected(selected, "terms")}`}
        onClick={() => history.push("/terms")}
      >
        Terms
      </div>
    </div>
  );
}

// Renders Overview button after having selected a stock
function getOverview(isDefault, selected, history) {
  if (isDefault) {
    return <></>;
  } else {
    return (
      <div
        className={`go-to-screener${getSelected(selected, "overviewpage")}`}
        onClick={() => history.push("/overviewpage")}
      >
        Overview
      </div>
    );
  }
}

// Checks if current route is selected to render highlighting of selected button
function getSelected(selected, route) {
  if (route === "home" && !selected) {
    return " currentlink";
  } else {
    return selected === route ? " currentlink" : "";
  }
}
