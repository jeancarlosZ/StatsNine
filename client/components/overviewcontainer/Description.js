import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

//* Returns the description box for the overview page
export default function Description({ symbol, data }) {
  useEffect(() => {}, [symbol]);
  return (
    <div className="overviewbox description shadow-nohover flex-col justify-around">
      <div className="headerTwo company-details pos-rel">{`${data.companyName}`}</div>
      {getDescriptionText(data.description)}
    </div>
  );
}

//* Returns the scrollbox with the companies description!
function getDescriptionText(description) {
  return <SimpleBar className="description-text-scroll">{description}</SimpleBar>;
}
