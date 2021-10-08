import React from "react";
import Searchbar from "./Searchbar";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <div className="our-company-name">StatsNine</div>
      <div className="header-space-one"></div>
      <Searchbar />
      <div className="header-space-two"></div>
      <div className="go-to-dashboard" onClick={() => history.push("/home")}>
        Dashboard
      </div>
      <div className="go-to-screener" onClick={() => history.push("/screener")}>
        Screener
      </div>
      <div className="go-to-about-us" onClick={() => history.push("/aboutus")}>
        About Us
      </div>
    </div>
  );
}
