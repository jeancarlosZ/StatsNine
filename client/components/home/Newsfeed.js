import React, { useEffect, useState } from 'react';
import { fetchStockNews } from '../../api/api';

export default function Newsfeed() {
  const [stockNewsList, setStockNewsList] = useState([]);

  useEffect(() => {
    async function getStockNewsList() {
      setStockNewsList(
        await fetchStockNews(['AAPL', 'MSFT', 'GOOG', 'FB', 'NVDA'], 10)
      );
    }
    getStockNewsList();
  }, []);

  const { keys, values } = stockNewsList;

  return (
    <div className="text-white">
      <h2>Latest News</h2>
      <div className="table-responsive ">
        <table className="table table-sm  table-borderless border-0 table-hover  ">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {stockNewsList.map(company => {
              return (
                <tr
                  key={company.publishedDate}
                  className="btn-group me-3 btn btn-md btn-outline  list-group-flush  rounded-pill shadow-lg "
                  type="button">
                  <td>
                    <img
                      src={company.image}
                      width="50"
                      alt={company.symbol}></img>
                  </td>
                  <td className="text-white list-group-item">
                    {company.title}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
