import React from "react";
import Header from "./components/Header";
import Routes from "./Routes";
import "../public/styles/header.scss";

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
};

export default App;
