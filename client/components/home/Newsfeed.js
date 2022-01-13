import React, { useEffect, useState } from "react";
import { fetchStockNews } from "../../api/api";
import "../../../public/styles/calendar2.css";

export default function Newsfeed() {
  const [stockNewsList, setStockNewsList] = useState([]);

  useEffect(() => {
    async function getStockNewsList() {
      setStockNewsList(await fetchStockNews(["AAPL", "MSFT", "GOOG", "FB", "NVDA"], 10));
    }
    getStockNewsList();
  }, []);

  return (
    <div className="text-white display-5 text-center position-relative">
      <h2>Latest News</h2>
      <div className="table-responsive ">
        <div className="table table-sm  table-borderless  table-hover">
          <ul>
            {stockNewsList.map(company => {
              return (
                <li
                  key={company.publishedDate}
                  className="btn-group me-3 btn   btn-outline-success  rounded-pill shadow-lg text-white  "
                  type="button"
                  style={{ opacity: ".77" }}
                >
                  <a href={company.url} className="text-white ">
                    <img src={company.image} width="50" alt={company.symbol}></img>

                    {company.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
