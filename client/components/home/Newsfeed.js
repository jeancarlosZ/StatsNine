import React, { useEffect, useState } from 'react';
import { fetchStockNews } from '../../api/api';

import { Collapse, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export default function Newsfeed() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setData(await fetchStockNews());
    }
    getData();
  }, []);

  return (
    <div className="dash-grid one">
      <div className="news-container shadow-deep-nohover">
        <div className="news-head shadow-nohover fs-4 text-center">
          <label>News Feed</label>
        </div>
        <SimpleBar className="news-scroll">{getNewsFeed(data)}</SimpleBar>
      </div>
    </div>
  );
}

//* Helper function to map the news feed
function getNewsFeed(data) {
  if (!data) return <></>;
  return data.map((news, idx) => <IndividualNews key={idx} data={news} />);
}

function IndividualNews({ data }) {
  if (!data) return <></>;
  const [open, setOpen] = useState(false);
  const { image, publishedDate, site, symbol, text, title, url } = data;

  return (
    <div className="news-item slide-loading ">
      <img
        src={image}
        alt={symbol}
        className="img-fluid  lead fw-lighter  "
        width="50"
        height="50"
      />
      <div className="news-content" onClick={() => setOpen(!open)}>
        <label>{title}</label>
        {open ? (
          <></>
        ) : (
          <label className="view btn text-white">View more...</label>
        )}
        <Collapse in={open}>
          <div className="news-content-full">
            {getLabelText('Publisher:', site)}
            {getLabelText('Published:', publishedDate)}
            <div className="fulltext">{text}</div>
            <Link to={{ pathname: url }} target="_blank">
              <div className="redirect">
                <button>View Article</button>
              </div>
            </Link>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

//* Get the label text pairs
function getLabelText(label, text) {
  return (
    <div className="labeltext">
      <label>{label}</label>
      <span>{text}</span>
    </div>
  );
}
