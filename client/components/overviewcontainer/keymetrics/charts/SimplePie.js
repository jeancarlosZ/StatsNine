import React from "react";
import UniversalChart from "../../../UniversalChart";

export default function SimplePie({ data }) {
  const { avg, libs } = data ? data : {};

  const dataset = [];

  //* If we have the data
  if (avg) {
    dataset.push({
      fullSet: {
        name: "FCF % LTL",
        type: "pie",
        labels: ["LTL", "FCF"],
        marker: {
          colors: ["rgba(38, 197, 217, .6)", "rgba(250, 173, 20, .7)"],
        },
        values: [libs, avg],
        hoverinfo: "label+percent",
      },
    });
  }

  //* Return the chart
  return (
    <>
      <div className="safetyselector">
        <label>FCF % LTL</label>
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-fcfltl-chart"
          dataset={dataset}
          showlegend={false}
          margin={{ l: 0, r: 0, b: 75, t: 0 }}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </>
  );
}
